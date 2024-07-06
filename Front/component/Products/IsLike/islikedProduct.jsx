import axios from "axios";
import { Alert } from "react-native";

const islike = async (productid, userid, token, navigation) => {
  if (!token || !userid) {
    navigation.navigate("LogIn");
    return;
  }
  try {
    const response = await axios.post(
      `https://urbannestfurniture.somee.com/api/Islike?Productid=${productid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    Alert.alert("Product added successfully");
  } catch (error) {
    console.log(error);
  }
};

export default islike;
