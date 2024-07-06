import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ListProductInCart from "../../CartComponent/ListProduct/ListProduct";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./style";
import { COLORS } from "../../../constants";

export default function productInCart() {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [userID, setuserID] = useState("");
  const getData = async () => {
    const token = await AsyncStorage.getItem("token");
    const userID = await AsyncStorage.getItem("userID");
    const token2 = localStorage.getItem("token");
    setToken(token2);
    // setuserID(userID);
  };
  getData();

  if (token == null) {
    navigation.navigate("LogIn");
  }
  return (
    <SafeAreaView>
      <View style={styles.conatiner}>
        <View style={styles.wrapper}>
          <View style={styles.UpperRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-circle"
                size={35}
                color={COLORS.lightWhite}
              />
            </TouchableOpacity>
            <Text style={styles.header}>Cart</Text>
          </View>
          <ListProductInCart />
        </View>
      </View>
    </SafeAreaView>
  );
}
