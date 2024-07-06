import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS, SIZES } from "../../../constants";
import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Fontisto,
  AntDesign,
} from "@expo/vector-icons";
import DeleteLike from "./DeleteLike";

export default function ProductCardViewLike({ item }) {
  const [token, setToken] = useState(null);
  const [userID, setuserID] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      try {
        // const storedToken = await AsyncStorage.getItem("token");
        // const storedUserID = await AsyncStorage.getItem("userID");
        const token2 = localStorage.getItem("token");
        setToken(token2);
        // setToken(storedToken);
        // setUserID(storedUserID);
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error.message);
      }
    };

    getData();
  }, []);

  const DeleteLikeHandler = () => {
    console.log(item.id, userID, token);
    DeleteLike(item.id, userID, token, navigation);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetails", { item })}
      >
        <View style={styles.image}>
          <Image source={{ uri: item.imageUrl }} style={styles.productImg} />
        </View>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.productTitle}>{item.name}</Text>
        <Text style={styles.supplier}>{item.supplier}</Text>
        <Text style={styles.supplier}>{item.price}</Text>
      </View>
      <TouchableOpacity onPress={DeleteLikeHandler}>
        <MaterialCommunityIcons name="delete" size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.small,
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
  },
  image: {
    width: 70,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignContent: "center",
  },
  productImg: {
    width: "100%",
    height: 65,
    borderRadius: SIZES.small,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productTitle: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  supplier: {
    fontFamily: "regular",
    fontSize: SIZES.small + 2,
    color: COLORS.gray,
    marginTop: 3,
  },
});
