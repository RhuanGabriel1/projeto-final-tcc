import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
import { Button } from "../../components/Button/button";
import { Input } from "../../components/Input";
import { Page } from "../../components/Page";
import { colors } from "../../components/styles/colors";
import { errorToast, successToast } from "../../utils/toast";
import { insertData } from "../../Database/Database";


const Carp = () => {
  const [descricao, setDescricao] = useState();
  const [taxa, setTaxa] = useState();
  const [periodo, setPeriodo] = useState();
  const [valorPresente, setValorPresente] = useState();
  const [valorFuturo, setValorFuturo] = useState();
  const [tipo, setTipo] = useState();
  const [carpResult, setCarpResult] = useState();
  const [newData, setNewData] = useState([]);

  const handleCarp = () => {
    const r = taxa / 100;
    const valorPresenteAjustado = valorPresente - valorFuturo / Math.pow(1 + r, periodo);
    const numerador = valorPresenteAjustado * (r * Math.pow(1 + r, periodo));
    const denominador = Math.pow(1 + r, periodo) - 1;
    const pgto = numerador / denominador;
    //const result = tipo ? pgto / (1 + r) : pgto;
    const result = !tipo ? pgto : pgto / (1 + r);

    setCarpResult(result.toFixed(2));
  };

  const filterOnlyNumbers = (text) => {
    return text.replace(/[^0-9]/g, "");
  };

  const clearForm = () => {
    setDescricao("");
    setTaxa("");
    setPeriodo("");
    setValorPresente("");
    setValorFuturo("");
    setTipo(false);
    setCarpResult("");
    setNewData([]);

  };

  const handleSave = async () => {
    try {
      if (!descricao || !taxa || !periodo || !valorPresente || !valorFuturo || !carpResult ) {
        errorToast({
          title: "Preencha todos os campos",
        });
        return;
      }
      const updatedData = {
        ...newData,
        descricao: descricao,
        taxa : taxa ,
        periodo : periodo,
        valorAquisicao : valorPresente ,
        valorResidual : valorFuturo ,
        tipo : tipo ?? false ,
        carpResultado : carpResult ,
      };
      await insertData(updatedData, "CARP");
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

  const cantSaveCarp = isNaN(carpResult) || !carpResult;

  return (
    <Page>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <Input label="Descrição" placeholder="Digite uma descrição" value={descricao} onChangeText={setDescricao} />
          <Input
            keyboardType="numeric"
            label="Taxa (%)"
            placeholder="Digite a taxa em porcentagem"
            value={taxa}
            onChangeText={setTaxa}
          />
          <Input
            keyboardType="numeric"
            label="Período (ANO)"
            placeholder="Digite o período em anos"
            value={periodo}
            onChangeText={(text) => setPeriodo(filterOnlyNumbers(text))}
          />
          <Input
            keyboardType="numeric"
            label="Valor de Aquisição (R$)"
            placeholder="Ex:1000.10"
            value={valorPresente}
            onChangeText={setValorPresente}
          />
          <Input
            keyboardType="numeric"
            label="Valor Residual (R$)"
            placeholder="Ex: 1200.45"
            value={valorFuturo}
            onChangeText={setValorFuturo}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Será efetuado no início do período?
            </Text>
            <CheckBox onPress={() => setTipo((prev) => !prev)} checked={tipo} />
          </View>
          <View style={{ flex: 1 }} />
          <Text style={styles.total}>Total: {!cantSaveCarp ? carpResult : "CARP Inválido"}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              title="Calcular"
              onPress={handleCarp}
              customStyle={{
                width: "48%",
              }}
            />
            <Button
              title="Salvar"
              isDisabled={cantSaveCarp}
              onPress={handleSave}
              customStyle={{
                backgroundColor: cantSaveCarp ? colors.gray : colors.primary,
                width: "48%",
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Page>
  );
};

const styles = StyleSheet.create({
  headingAcess: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 25,
  },
  total: {
    marginVertical: 32,
    fontSize: 21,
    fontWeight: "bold",
    color: colors.primary,
  },
});

export default Carp;
