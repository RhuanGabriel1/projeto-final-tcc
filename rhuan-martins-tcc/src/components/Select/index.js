import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../styles/colors";

export const Select = ({ label, placeholder, value, onChange, options }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionPress = (option) => {
    setSelectedValue(option.label);
    onChange(option.value);
    toggleDropdown();
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <Text style={styles.buttonValue}>{selectedValue || placeholder || "Selecione uma opção"}</Text>
      </TouchableOpacity>
      <Modal visible={isDropdownOpen} transparent>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={toggleDropdown}>
          {options.map((item, index) => (
            <View style={styles.dropdown} key={index.toString()}>
              <TouchableOpacity style={styles.option} onPress={() => handleOptionPress(item)}>
                <Text>{item.label}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </TouchableOpacity>
      </Modal>
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
  dropdownButton: {
    height: 48,
    backgroundColor: colors.white,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    width: "80%",
    backgroundColor: colors.white,
    padding: 16,
  },
  option: {
    padding: 8,
  },
  buttonValue: {
    fontSize: 16,
    color: colors.black,
    margin: 12,
  },
});
