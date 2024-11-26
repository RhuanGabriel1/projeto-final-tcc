import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../styles/colors";

export const Input = ({ label, placeholder, value, onChangeText, secureTextEntry, keyboardType }, ...inputData) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...inputData}
        keyboardType={keyboardType}
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 48,
    backgroundColor: colors.white,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 24,
  },
});
