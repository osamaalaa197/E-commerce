import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import addtoCart from "../../CartComponent/AddCart/AddCart";
import islike from "../../ProductComponent/islikedProduct/islikedProduct";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./style";
import { COLORS, SIZES } from "../../../constants";

export default function ProdectDetails({ navigation }) {
  const route = useRoute();
  const { item } = route.params;
  const [count, setCount] = useState(1);
  console.log(item);
  const [token, setToken] = useState("");
  const [userID, setuserID] = useState("");

  const getData = async () => {
    const token = await AsyncStorage.getItem("token");
    const userID = await AsyncStorage.getItem("userID");
    setToken(token);
    setuserID(userID);
  };
  getData();
  console.log(token);
  console.log(userID);

  const IncreamentNum = () => {
    if (count < 5) {
      setCount(count + 1);
    }
  };
  const decreamentNum = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const handelAddIsLike = () => {
    console.log(item.id, userID, token, navigation);
    islike(item.id, userID, token, navigation);
  };
  const handelAddToCart = () => {
    addtoCart(item.id, userID, token, navigation, count);
  };
  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={35} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handelAddIsLike}>
          <Ionicons name="heart" size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <Image
        style={styles.image}
        source={{
          uri: item.imageUrl,
        }}
      />
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Ionicons key={item} name="star" size={24} color="gold" />
            ))}
            <Text style={styles.ratingText}>(4.9)</Text>
          </View>
          <View style={styles.rating}>
            <TouchableOpacity onPress={() => IncreamentNum()}>
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>
            <Text style={styles.ratingText}>{count}</Text>
            <TouchableOpacity onPress={() => decreamentNum()}>
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.decriptionWrapper}>
          <Text style={styles.decription}>Desciption</Text>
          <Text style={styles.decriptionText}>{item.descirption}</Text>
        </View>
        <View style={{ marginBottom: SIZES.small }}>
          <View style={styles.location}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="location-outline" size={20} />
              <Text>{item.product_Location}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={20} />
              <Text>--Free Delivery--</Text>
            </View>
          </View>
        </View>
        <View style={styles.CartRow}>
          <TouchableOpacity
            onPress={() => {
              console.log("hiiiiiii");
            }}
            style={styles.CartBtm}
          >
            <Text style={styles.CartTitle}>--Buy Now---</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handelAddToCart} style={styles.addCart}>
            <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
