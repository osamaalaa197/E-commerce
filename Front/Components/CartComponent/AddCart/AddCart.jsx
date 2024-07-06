import axios from "axios";
import { Alert } from "react-native";

const addToCart = async (productId, userId, token, navigation, count) => {
  if (!token || !userId) {
    navigation.navigate("LogIn");
    return;
  }

  try {
    const response = await axios.post(
      `https://urbannestfurniture.somee.com/api/Cart?productid=${productId}&Quantity=${count}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      Alert.alert("Product added successfully");
      alert("Product added successfully");
    } else {
      Alert.alert("Failed to add product to cart");
      alert("Failed to add product to cart");
    }
  } catch (error) {
    console.error("Error adding product to cart:", error.message);
    Alert.alert("An error occurred while adding the product to cart");
  }
};

export default addToCart;
