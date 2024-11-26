import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Button } from "../../components/Button/button";
import { Input } from "../../components/Input";
import { Page } from "../../components/Page";
import { errorToast, successToast } from "../../utils/toast";
import SignUp from '../../Auth/SignUpFirebase';

const CreateAccount = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleSubmit = async () => {
    try {
      if (password !== rePassword) {
        errorToast({ title: "As senhas não conferem", description: "Digite as senhas novamente" });
        return;
      }
      await SignUp.signUp(email, password);
      successToast({ title: "Conta criada com sucesso" });
      navigation.navigate("Login");
    } catch (e) {
      errorToast({ title: "Erro ao criar conta", description: e.message });
    }
  };

  return (
    <Page>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Input label="Nome" placeholder="Nome" value={name} onChangeText={setName} />
          <Input label="E-mail" placeholder="E-mail" keyboardType="email-address" value={email} onChangeText={setEmail} />
          <Input label="Senha" secureTextEntry placeholder="Senha" value={password} onChangeText={setPassword} />
          <Input
            label="Repita sua Senha"
            secureTextEntry
            placeholder="Repita sua Senha"
            value={rePassword}
            onChangeText={setRePassword}
          />
          <View style={{ flex: 1 }} />
          <Button title="Cadastrar" onPress={handleSubmit} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Page>
  );
};

export default CreateAccount;
