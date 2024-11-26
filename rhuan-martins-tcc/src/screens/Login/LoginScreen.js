import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import SignIn from "../../Auth/SignInFirebase";
import { Button } from "../../components/Button/button";
import { Input } from "../../components/Input";
import { Page } from "../../components/Page";
import { TextButton } from "../../components/TextButton";

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleCreateAccount = () => {
    navigation.navigate("CreateAccount");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const handleAcessar = () => {
    setError("");
    SignIn.signInEmail(email, password)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch(() => {
        setError("Login ou senha inválidos");
      });
  };

  return (
    <Page>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={-300}>
        <ScrollView contentContainerStyle={styles.container}>
          <View>
            <Input label="Email" placeholder="ex: teste@teste.com.br" value={email} onChangeText={setEmail} />
            <Input
              label="Senha"
              placeholder="Digite sua senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {error && (
              <Text
                style={{
                  color: "red",
                  marginBottom: 32,
                }}
              >
                {error}
              </Text>
            )}

            <TextButton title="Criar conta" onPress={handleCreateAccount} />
            <TextButton title="Esqueci meu acesso" onPress={handleForgotPassword} />
            <View style={styles.divider} />
            <View style={{ flex: 1 }} />
            <Button title="Acessar" onPress={handleAcessar} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Page>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-around",
  },
  divider: {
    marginTop: 64,
  },
});

export default Login;
