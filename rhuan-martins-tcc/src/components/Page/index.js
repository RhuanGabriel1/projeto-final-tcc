import { StyleSheet, View } from "react-native";
import { colors } from "../styles/colors";

export const Page = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
