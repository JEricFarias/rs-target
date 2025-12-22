import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Divider } from "@/components/Divider";
import { Summary, SummaryProps } from "@/components/Summary";

import { colors } from "@/theme/colors";
import { styles } from "./styles";

export type HomeHeaderProps = {
  total: string;
  input: SummaryProps;
  output: SummaryProps;
};

type Props = {
  data: HomeHeaderProps;
};

export function HomeHeader({ data }: Props) {
  return (
    <LinearGradient
      colors={[colors.blue[500], colors.blue[800]]}
      style={styles.container}
    >
      <View>
        <Text style={styles.label}>Total que você possui</Text>
        <Text style={styles.total}>{data.total}</Text>
      </View>

      <Divider color={colors.blue[400]} />

      <View style={styles.summary}>
        <Summary
          data={data.input}
          icon={{ name: "arrow-upward", color: colors.green[500] }}
        />

        <Summary
          data={data.output}
          icon={{ name: "arrow-downward", color: colors.red[400] }}
          isRight
        />
      </View>
    </LinearGradient>
  );
}
