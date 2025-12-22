import { StatusBar, View } from "react-native";
import { router } from "expo-router";

import { List } from "@/components/List";
import { Target } from "@/components/Target";
import { Button } from "@/components/Button";
import { HomeHeader } from "@/components/HomeHeader";

const summary = {
  total: "R$ 2.680,00",
  input: { label: "Entradas", value: "R$ 6,184.90" },
  output: { label: "Saidas", value: "-R$ 883.65" },
};

const targets = [
  {
    id: "1",
    name: "Samsung Watch",
    current: "580,00",
    percentage: "50%",
    target: "1.790,00",
  },
  {
    id: "2",
    name: "Comprar cadeira ergonomica",
    current: "900,00",
    percentage: "75%",
    target: "1.200,00",
  },
];

export default function Index() {
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
