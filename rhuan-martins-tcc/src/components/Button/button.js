import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../styles/colors";

export const Button = ({ title, onPress, customStyle, isDisabled }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled} style={[styles.container, customStyle]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 4,
  },
  text: {
    fontWeight: "bold",
    color: colors.white,
    textTransform: "uppercase",
    fontSize: 16,
  },
});
