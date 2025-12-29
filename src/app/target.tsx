import { useEffect, useState } from "react";
import { Alert, StatusBar, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { useTargetDatabase } from "@/database/useTargetDatabase";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CurrencyInput";

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const params = useLocalSearchParams<{ id?: string }>();

  const targetDatabase = useTargetDatabase();

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert(
        "Atenção",
        "Preencha nome e valor precisa ser maior que zero."
      );
    }

    setIsProcessing(true);

    if (params.id) {
      update(Number(params.id));
    } else {
      create();
    }
  }

  function create() {
    try {
      const novo = { name, amount };
      targetDatabase.create(novo).then(() => {
        Alert.alert("Nova meta", "Meta criada com sucesso", [
          {
            text: "Ok",
            onPress: () => router.back(),
          },
        ]);
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a meta");
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  }

  async function update(id: number) {
    try {
      targetDatabase.update({
        name,
        amount,
        id,
      });
      Alert.alert("Meta atualizada", "Meta atualizada com sucesso", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar a meta");
      console.log("🛑 -", error);
      setIsProcessing(false);
    }
  }

  async function remove() {
    try {
      setIsProcessing(true);

      await targetDatabase.remove(Number(params.id));
      Alert.alert("Meta removida", "Meta removida com sucesso", [
        { text: "Ok", onPress: () => router.replace("/") },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover a meta");
      console.log("🛑 -", error);
    }
  }

  function handleRemove() {
    if (!params.id) return;

    Alert.alert("Atenção", "Deseja realmente remover essa meta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        onPress: remove,
      },
    ]);
  }

  async function fetchDetails(id: number) {
    try {
      const response = await targetDatabase.show(id);
      setName(response.name);
      setAmount(response.amount);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta");
      console.log("🛑 -", error);
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchDetails(Number(params.id));
    }
  }, [params.id]);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <StatusBar barStyle="dark-content" />

      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira."
        rightButton={
          params.id ? { icon: "delete", onPress: handleRemove } : undefined
        }
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da meta"
          placeholder="Ex. Viagem para praia, Samsung Watch"
          onChangeText={setName}
          value={name}
        />
        <CurrencyInput
          label="Valor alvo (R$)"
          onChangeValue={setAmount}
          value={amount}
        />
        <Button
          title="Salvar"
          onPress={handleSave}
          isProcessing={isProcessing}
        />
      </View>
    </View>
  );
}
