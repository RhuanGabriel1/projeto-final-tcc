import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../../../components/styles/colors";

export const HeaderHome = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>SAIR</Text>
          <Icon name="logout" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seja Bem-vindo!</Text>
        <Text style={styles.headerTitle}>Aqui você pode controlar suas operações</Text>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.primary,
    minHeight: 120,
    justifyContent: "center",
    flex: 1,
  },
  button: {
    backgroundColor: colors.primaryLight,
    borderRadius: 8,
    width: 120,
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    marginTop: 16,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  header: {
    justifyContent: "space-between",
    marginHorizontal: 24,
  },

  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
});
