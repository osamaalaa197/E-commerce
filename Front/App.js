import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, YellowBox } from "react-native";
import { useFonts } from "expo-font";
import * as SplachScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "./navigations/ButtonNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "./Screens/Cart";
import ProdectDetails from "./Screens/ProductDetails";
import NewRivals from "./Screens/NewRivals";
import Register from "./Screens/Register";
import LogIn from "./Screens/LogIn";
import listProductInCart from "./component/Cart/listProductInCart";
import productInCart from "./component/Cart/ProductInCart";
import * as Permissions from "expo-permissions";

const stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    extraBold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    semiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });
  const onlatOutView = useCallback(async () => {
    if (fontsLoaded) {
      await SplachScreen.hideAsync();
    }
  });
  useEffect(() => {
    requestNetworkPermission();
  }, []);
  const requestNetworkPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.INTERNET);

    if (status === "granted") {
      console.log("Network permission granted");
    } else {
      console.log("Network permission denied");
    }
  };
  if (!fontsLoaded) return null;
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="ButoomNavigation"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />
        {/* <stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        /> */}
        <stack.Screen
          name="ProductDetails"
          component={ProdectDetails}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="ListProduct"
          component={NewRivals}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="LogIn"
          component={LogIn}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="Cart"
          component={productInCart}
          options={{ headerShown: false }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textFont: {
    fontFamily: "regular",
    fontSize: 20,
  },
});
