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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ProductCardView from "../Products/ProductCardView";
import { SIZES } from "../../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ListProductInCart() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState("");
  const [userID, setUserID] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7120/api/Cart?userid=${userID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        // Ensure there is data before accessing properties
        if (response.data && response.data[0] && response.data[0].cartProdcts) {
          setData(response.data[0].cartProdcts);
        } else {
          console.error('No data found in the response.');
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userID = await AsyncStorage.getItem('userID');
        if (token && userID) {
          setToken(token);
          setUserID(userID);
          fetchData(); // Call the fetchData function once you have the token and userID
        } else {
          console.error('Token or userID is missing in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error getting data from AsyncStorage:', error.message);
      }
    };
    getData();
  }, []);


  console.log("data", userID);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => <ProductCardView item={item} />}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: SIZES.xxLarge,
    paddingLeft: SIZES.small / 2,
  },
  separator: {
    height: 16,
  },
});
