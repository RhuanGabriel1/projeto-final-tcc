import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import ForgotPasswordFirebase from "../../Auth/ForgotPasswordFirebase";
import { Button } from "../../components/Button/button";
import { Input } from "../../components/Input";
import { Page } from "../../components/Page";
import { errorToast, successToast } from "../../utils/toast";

const ForgotPassword = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");

  const handleRecover = async () => {
    try {
      const hasSended = await ForgotPasswordFirebase.resetPassword(email);
      if (!hasSended) {
        errorToast({ title: "Erro ao enviar e-mail de redefinição de senha", description: "E-mail não encontrado" });
        return;
      }
      successToast({ title: "E-mail de redefinição de senha enviado" });
      navigation.goBack();
    } catch (e) {
      errorToast({ title: "Erro ao enviar e-mail de redefinição de senha", description: "E-mail não encontrado" });
    }
  };

  return (
    <Page>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View>
            <Input
              label="Para receber um e-mail de reset de senha, insira-o aqui"
              placeholder="E-mail"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={{ flex: 1 }} />
          <Button title="Recuperar" onPress={handleRecover} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Page>
  );
};

export default ForgotPassword;
