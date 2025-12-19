import { router, useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>InProgress id {params.id}</Text>
      <Button title="voltar" onPress={() => router.back()} />
    </View>
  );
}
