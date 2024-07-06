import styles from "./style";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import addtoCart from "../../CartComponent/AddCart/AddCart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SIZES, COLORS } from "../../../constants";

export default function ProductCardView({ item }) {
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
  const handelAddToCart = () => {
    addtoCart(item.id, userID, token, navigation, 1);
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
            {item.name}
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
