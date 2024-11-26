import { FlatList, StyleSheet, View } from "react-native";
import { colors } from "../../components/styles/colors";
import { Card } from "./components/Card";
import { HeaderHome } from "./components/Header";
import { menuItems } from "./menu";
const Home = () => {
  return (
    <View style={styles.container}>
      <HeaderHome />
      <FlatList
        contentContainerStyle={styles.list}
        data={menuItems}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => <Card title={item.title} icon={item.icon} route={item.route} />}
        numColumns={2}
      />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
