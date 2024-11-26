import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "./components/styles/colors";
import Administration from "./screens/Administration/AdministrationScreen";
import CarpScreen from "./screens/Carp/CarpScreen";
import Commodities from "./screens/Commodities/CommoditiesScreen";
import CreateAccount from "./screens/CreateAccount/CreateAccountScreen";
import DatabaseScreen from "./screens/Database/DatabaseScreen";
import ForgotPassword from "./screens/ForgotPassword/FogotPassowordScreen";
import Home from "./screens/Home/HomeScreen";
import Login from "./screens/Login/LoginScreen";
import ManualOperations from "./screens/ManualOperations/ManualOperationsScreen";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            color: colors.white,
          },
          headerTintColor: colors.white,
        }}
      >
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerTitle: "Crie sua conta" }} />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerTitle: "Esqueci minha senha" }}
        />
        <Stack.Screen
          name="ManualOperations"
          component={ManualOperations}
          options={{ headerTitle: "Operações Manuais" }}
        />
        <Stack.Screen name="Commodities" component={Commodities} options={{ headerTitle: "Insumos" }} />
        <Stack.Screen name="Administration" component={Administration} options={{ headerTitle: "Administração" }} />
        <Stack.Screen name="CarpScreen" component={CarpScreen} options={{ headerTitle: "CARP" }} />
        <Stack.Screen name="DatabaseScreen" component={DatabaseScreen} options={{ headerTitle: "Dados" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
