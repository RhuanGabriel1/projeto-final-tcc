import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../styles/colors";

export const TextButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 8,
  },
  text: {
    color: colors.primary,
    fontSize: 16,
  },
});
