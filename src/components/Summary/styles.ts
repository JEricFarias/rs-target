import { colors, fontFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  header: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.white,
  },
  value: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fontFamily.regular,
  },
});
