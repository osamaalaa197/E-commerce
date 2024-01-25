import axios from "axios";
import { Alert } from "react-native";

const islike = async (productid, userid, token, navigation) => {
  if (!token || !userid) {
    navigation.navigate("LogIn");
    return;
  }
  try {
    const response = await axios.post(
      `https://localhost:7120/api/Islike?Productid=${productid}&id=${userID} `,
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
