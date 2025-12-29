import { useCallback, useState } from "react";
import { Alert, StatusBar, View } from "react-native";
import { router, useFocusEffect } from "expo-router";

import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";

import { List } from "@/components/List";
import { Target, TargetProps } from "@/components/Target";
import { Button } from "@/components/Button";
import { HomeHeader, HomeHeaderProps } from "@/components/HomeHeader";
import { Loading } from "@/components/Loading";

import { numberToCurrency } from "@/utils/numberToCurrency";

export default function Index() {
  const [isFetching, setIsFetching] = useState(true);
  const [targets, setTargets] = useState<TargetProps[]>([]);
  const [summary, setSummary] = useState<HomeHeaderProps>();

  const targetDatabase = useTargetDatabase();
  const transactionsDatabase = useTransactionsDatabase();

  async function fetchSummary(): Promise<HomeHeaderProps> {
    try {
      const response = await transactionsDatabase.summary();

      return {
        total: numberToCurrency(response.input + response.output),
        input: {
          label: "Entradas",
          value: numberToCurrency(response.input),
        },
        output: {
          label: "Saídas",
          value: numberToCurrency(response.output),
        },
      };
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar o resumo.");
      console.log("🛑 -", error);
    }
  }

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await targetDatabase.listBySavedValue();

      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: numberToCurrency(item.current),
        percentage: item.percentage.toFixed(0) + "%",
        target: numberToCurrency(item.amount),
      }));
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as metas");
      console.log(error);
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets();
    const summaryDataPromise = fetchSummary();

    const [targetData, summaryData] = await Promise.all([
      targetDataPromise,
      summaryDataPromise,
    ]);

    setTargets(targetData);
    setSummary(summaryData);
    setIsFetching(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <HomeHeader data={summary} />
      <List
        title="Metas"
        data={targets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        emptyMessage="Nem uma meta cadastrada."
        containerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova meta" onPress={() => router.navigate("/target")} />
      </View>
    </View>
  );
}
