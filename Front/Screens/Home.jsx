import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../constants";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import Welcome from "../home/welcome";
import { TextInput } from "react-native";
import Carousel from "../home/carousel";
import Heading from "../home/Heading";
import ProductRaw from "../component/Products/ProductRow";
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation=useNavigation()
  return (
    <SafeAreaView>
      <View style={styles.AppBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name="location-outline" size={24} />
          <Text style={styles.location}>hidasdas</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("LogIn")}>
          <FontAwesome name="sign-in" size={24} color="black" />
          </TouchableOpacity>
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.CartCount}>
              <Text style={styles.CartNumber}>8</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <Fontisto name="shopping-bag" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <Welcome />
        <Carousel />
        <Heading />
        <ProductRaw />
        <ProductRaw />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "bold",
    fontSize: 40,
  },
  AppBarWrapper: {
    marginHorizontal: 22,
    marginTop: SIZES.small,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    fontFamily: "semiBold",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  CartCount: {
    position: "absolute",
    bottom: 60,
    width: 60,
    height: 60,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "green",
    justifyContent: "center",
    zIndex: 999,
  },
  CartNumber: {
    fontFamily: "regular",
    fontWeight: "600",
    fontSize: 10,
    color: COLORS.lightWhite,
  },
});
