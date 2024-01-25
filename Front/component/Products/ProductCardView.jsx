import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import addtoCart from "../Cart/AddToCart";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import addtoCart from "../Cart/AddToCart";

export default function ProductCardView({ item }) {
  const navigation = useNavigation();
  const[token,setToken]=useState("")
  const[userID,setuserID]=useState("")

  const getData=async()=>{
      const token=await AsyncStorage.getItem("token")
      const userID=await AsyncStorage.getItem("userID")
      setToken(token)
      setuserID(userID)
  }
  getData();
  const handelAddToCart = () => {
    addtoCart(item.id, userID, token, navigation);
  };
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { item })}
    >
      <View style={styles.container}>
        <View style={styles.ImageConatiner}>
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={styles.Image}
          />
        </View>
        <View style={styles.detail}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {item.supplier}
          </Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
        <TouchableOpacity style={styles.addBtm} onPress={handelAddToCart}>
          <Ionicons name="add-circle" size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 182,
    height: 240,
    marginEnd: 22,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
  },
  ImageConatiner: {
    flex: 1,
    width: 170,
    marginLeft: SIZES.small / 2,
    marginTop: SIZES.small / 2,
    borderRadius: SIZES.small,
    overflow: "hidden",
    // backgroundColor:COLORS.gray2
  },
  Image: {
    aspectRatio: 1,
    resizeMode: "cover",
  },
  detail: {
    padding: SIZES.small,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    marginBottom: 2,
  },
  supplier: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  price: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
  },
  addBtm: {
    position: "absolute",
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});
