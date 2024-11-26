import * as firebase from "firebase/app";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import AppNavigator from "./src/AppNavigator";
import { firebaseConfig } from "./src/Auth/FirebaseConfig";

export default function App() {
  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
  }, []);

  return (
    <>
      <AppNavigator />
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 500,
  },
});
