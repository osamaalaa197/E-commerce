import axios from "axios";
import { Alert } from "react-native";

const DeleteFromCart = async (productId, token, navigation) => {
  if (!token) {
    navigation.navigate("LogIn");
    return;
  }

  try {
    const response = await axios.delete(
      `https://urbannestfurniture.somee.com/api/Cart?ProductID=${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data && response.data.success) {
      Alert.alert("Product Deleted successfully");
      onSuccess();
    } else {
      Alert.alert("Failed to delete product");
    }
  } catch (error) {
    console.error("Error deleting product:", error.message);
    Alert.alert("An error occurred while deleting the product");
  }
};

export default DeleteFromCart;
