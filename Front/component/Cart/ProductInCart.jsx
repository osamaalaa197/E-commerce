import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import listProductInCart from "../Cart/listProductInCart";
import { COLORS, SIZES } from "../../constants";
import ListProductInCart from "../Cart/listProductInCart";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function productInCart() {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [userID, setuserID] = useState("");

  const getData = async () => {
    const token = await AsyncStorage.getItem("token");
    const userID = await AsyncStorage.getItem("userID");
    setToken(token);
    setuserID(userID);
  };
  getData();

  // const token = localStorage.getItem("token");
  // console.log( "token :",token)
  if (token==null) {
    // console.log( "token :",token)
    navigation.navigate("LogIn");
  }
  return (
    <SafeAreaView>
      <View styl={styles.conatiner}>
        <View style={styles.wrapper}>
          <View style={styles.UpperRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-circle"
                size={35}
                color={COLORS.lightWhite}
              />
            </TouchableOpacity>
            <Text style={styles.header}>Products In Cart</Text>
          </View>
          <ListProductInCart  />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  UpperRow: {
    width: SIZES.width - 50,
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    borderRadius: SIZES.large,
    backgroundColor: COLORS.primary,
    top: SIZES.large,
    zIndex: 999,
  },
  header: {
    fontFamily: "semiBold",
    fontSize: SIZES.large,
    color: COLORS.lightWhite,
    marginLeft: 5,
  },
});
