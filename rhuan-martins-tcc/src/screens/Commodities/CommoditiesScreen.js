import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/Button/button";
import { Input } from "../../components/Input";
import { Page } from "../../components/Page";
import { Select } from "../../components/Select";
import { colors } from "../../components/styles/colors";
import { insertData } from "../../Database/Database";
import { errorToast, successToast } from "../../utils/toast";

const ManualOperations = () => {
  const [description, setDescription] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [amount, setAmount] = useState("");
  const [newData, setNewData] = useState([]);

  const handleNumber1Change = (val) => {
    setVal1(val);
    manualOperationCalculator(val, val2);
  };

  const handleNumber2Change = (val) => {
    setVal2(val);
    manualOperationCalculator(val1, val);
  };

  const manualOperationCalculator = (val1, val2) => {
    const parsedNum1 = parseFloat(val1);
    const parsedNum2 = parseFloat(val2);

    if (!isNaN(parsedNum1) && !isNaN(parsedNum2)) {
      const calculatedResult = parsedNum1 * parsedNum2;
      const roundedNumber = calculatedResult.toFixed(2);
      setAmount(roundedNumber.toString());
    } else {
      setAmount("");
    }
  };

  const clearForm = () => {
    setDescription("");
    setVal1("");
    setVal2("");
    setSelectedValue("");
    setAmount("");
    setNewData([]);
  };

  const handleSubmit = async () => {
    try {
      if (!description || !val1 || !val2 || !amount) {
        errorToast({
          title: "Preencha todos os campos",
        });
        return;
      }
      const updatedData = {
        ...newData,
        descricao: description,
        unidade: selectedValue,
        valor: val1,
        quantidade: val2,
        total: amount,
      };
      await insertData(updatedData, "Commodities");
      successToast({
        title: "Dados inseridos com sucesso",
      });
      clearForm();
    } catch (error) {
      errorToast({
        title: "Erro ao inserir dados",
        description: error.message,
      });
    }
  };

  const options = [
    {
      label: "KG (Quilo)",
      value: "KG (Quilo)",
    },
    {
      label: "g (Grama)",
      value: "g (Grama)",
    },
    {
      label: "L (Litro)",
      value: "L (Litro)",
    },
    {
      label: "sc (Sacos)",
      value: "sc (Sacos)",
    },
    {
      label: "u (Unidade)",
      value: "u (Unidade)",
    },
  ];

  return (
    <Page>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Input onChangeText={setDescription} placeholder="Nome do insumo" value={description} label="Insumo" />

          <Select
            placeholder={"Selecione uma unidade"}
            label="Unidade"
            onChange={setSelectedValue}
            options={options}
            value={selectedValue}
          />

          <Input
            label={"Valor Unitário"}
            placeholder={"Valor unitário"}
            keyboardType="numeric"
            value={val1}
            onChangeText={handleNumber1Change}
          />
          <Input
            label="Quantidade"
            placeholder="Quantidade"
            keyboardType="numeric"
            value={val2}
            onChangeText={handleNumber2Change}
          />

          <View style={{ flex: 1 }} />
          <Text style={styles.total}>Total: {amount}</Text>
          <Button onPress={handleSubmit} title="Salvar" />
        </ScrollView>
      </KeyboardAvoidingView>
    </Page>
  );
};

const styles = StyleSheet.create({
  total: {
    marginVertical: 32,
    fontSize: 21,
    fontWeight: "bold",
    color: colors.primary,
  },
});

export default ManualOperations;
