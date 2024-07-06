import axios from "axios";
import { Alert } from "react-native";

const DeleteLike = async (productId, userId, token, navigation) => {
  if (!token) {
    navigation.navigate("LogIn");
    return;
  }

  try {
    const response = await axios.delete(
      `https://urbannestfurniture.somee.com/api/Islike?Productid=${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data && response.data.success) {
      Alert.alert("Product Deleted successfully");
      navigation.navigate("IsLike");
    } else {
      Alert.alert("Failed to delete product");
    }
  } catch (error) {
    console.error("Error deleting product:", error.message);
    Alert.alert("An error occurred while deleting the product");
  }
};

export default DeleteLike;
