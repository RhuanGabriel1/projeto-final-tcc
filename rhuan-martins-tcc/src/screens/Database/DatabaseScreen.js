import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { listenToData } from "../../Database/Database";
import { Page } from "../../components/Page";
import { Select } from "../../components/Select";
import { colors } from "../../components/styles/colors";
import { capitalize } from "../../utils/capitalize";

const Database = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [data, setData] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [keyOrder, setKeyOrder] = useState([]);

  const handleOptionPress = (value) => {
    const foundOption = options.find((option) => option.value === value);
    setSelectedValue(foundOption.label);
    setCollectionName(foundOption.value);
  };

  useEffect(() => {
    if (collectionName) {
      databaseResult(collectionName);
    }
  }, [collectionName]);

  const databaseResult = async (collectionName) => {
    const retrievedData = await listenToData(collectionName);
    setData(retrievedData);
    
    // Obter as chaves do primeiro item (como exemplo de estrutura)
    if (retrievedData.length > 0) {
      const firstItem = retrievedData[0];
      const keys = Object.keys(firstItem);
      setKeyOrder(keys); // Salvar a ordem das chaves
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        {keyOrder.map((key) => (
          item[key] !== undefined && (
            <View key={key} style={styles.item}>
              <Text style={styles.key}>{capitalize(key)}: </Text>
              <Text style={styles.value}>
                {key === "tipo" 
                  ? (item[key] ? "Início" : "Final") 
                  : item[key]
                }
              </Text>
            </View>
          )
        ))}
      </View>
    );
  };
  

  const options = [
    {
      label: "Operações Manuais",
      value: "ManualOperations",
    },
    {
      label: "Insumos",
      value: "Commodities",
    },
    {
      label: "Administração",
      value: "Administration",
    },
    {
      label: "CARP",
      value: "CARP",
    },
  ];

  return (
    <Page>
      <Select
        value={selectedValue}
        options={options}
        label={"Selecione um serviço"}
        placeholder={"Selecione um serviço"}
        onChange={handleOptionPress}
      />

      <FlatList
        data={data}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum dado encontrado</Text>
          </View>
        )}
        renderItem={renderItem}
        keyExtractor={(_i, index) => index.toString()}
        contentContainerStyle={styles.flatList}
      />
    </Page>
  );
};

const styles = StyleSheet.create({
  flatList: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    marginTop: 20,
    color: colors.red,
  },

  itemContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Para sombras no Android
    borderWidth: 0.3,
    borderColor: colors.lightGray,
  },

  item: {
    marginBottom: 8,
    borderBottomColor: colors.lightGray,
    paddingBottom: 8,
    flexDirection: "row",
  },
  key: {
    fontWeight: "bold",
    color: colors.primary,
    fontSize: 16,
  },
  value: {
    color: colors.blackOpacity2,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Database;