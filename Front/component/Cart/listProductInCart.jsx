import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SIZES } from "../../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductCardViewLike from "../Products/IsLike/ProductCardViewLike";
import DeleteFromCart from "./DeleteFromCart";

export default function ListProductInCart() {
  const [ProductCart, setProductCart] = useState([]);
  const [CartHeader, setCartHeader] = useState({});
  const [token, setToken] = useState("");
  const [userID, setUserID] = useState("");
  const navigation = useNavigation();

  const fetchData = async (token) => {
    console.log("tooooken", token);
    try {
      const response = await axios.get(
        `https://urbannestfurniture.somee.com/api/Cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Ensure there is data before accessing properties
      if (response.data.success == true) {
        console.log("All data", response.data);
        setCartHeader(response.data.data.cartHeader);
        console.log("CartDetail", response.data.data.cartItem);
        setProductCart(response.data.data.cartItem);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userID = await AsyncStorage.getItem("userID");
      const token2 = localStorage.getItem("token");
      if (token && userID) {
        setToken(token);
        setUserID(userID);
        fetchData(token2); // Call fetchData with the token
      } else {
        console.error("Token or userID is missing in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error getting data from AsyncStorage:", error.message);
    }
  };
  const DeleteCartHandler = async (item) => {
    const response = await axios.delete(
      `https://urbannestfurniture.somee.com/api/Cart?ProductID=${item.products.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data && response.data.success) {
      Alert.alert("Product Deleted successfully");
    } else {
      Alert.alert("Failed to delete product");
    }
    getData();
  };
  useEffect(() => {
    getData();
  }, []);
  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: item.products.imageUrl,
          }}
          style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.products.name}</Text>
          <Text style={styles.itemBrand}>{item.products.supplier}</Text>
          <Text style={styles.itemPrice}>
            ${item.products.price} × {item.count}
          </Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            DeleteCartHandler(item);
          }}
        >
          <Ionicons name="trash" size={20} color="#888" />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={ProductCart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.cartList}
      />
      <View style={styles.orderInfo}>
        <Text style={styles.orderInfoText}>Order Info</Text>
        <View style={styles.orderTotal}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>{CartHeader.cartTotal}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutAllButton}>
          <Text style={styles.checkoutAllButtonText}>
            CHECKOUT {CartHeader.cartTotal}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cartList: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemBrand: {
    fontSize: 14,
    color: "#888",
  },
  itemPrice: {
    fontSize: 14,
    color: "#333",
  },
  checkoutButton: {
    backgroundColor: "#004d40",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  deleteButton: {
    padding: 5,
  },
  orderInfo: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 15,
  },
  orderInfoText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutAllButton: {
    backgroundColor: "#004d40",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  checkoutAllButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
