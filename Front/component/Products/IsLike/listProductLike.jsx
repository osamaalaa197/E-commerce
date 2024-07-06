import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ProductCardView from "../ProductCardView";
import { SIZES } from "../../../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchList from "../SearchList";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProductCardViewLike from "./ProductCardViewLike";

export default function ListProductLike() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState("");
  const [userID, setUserID] = useState("");
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userID = await AsyncStorage.getItem("userID");
      const token2 = localStorage.getItem("token");
      if (token && userID) {
        setToken(token);
        setToken(token2);
        setUserID(userID);
        // Define fetchData inside getData
        const fetchData = async (token) => {
          try {
            const response = await axios.get(
              `https://urbannestfurniture.somee.com/api/Islike`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            // Ensure there is data before accessing properties
            if (response.data.success == true) {
              setData(response.data.data);
            }
          } catch (error) {
            console.error("Error fetching data:", error.message);
          }
        };
        fetchData(token);
      } else {
        console.error("Token or userID is missing in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error getting data from AsyncStorage:", error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  console.log("dasdaddasd", data);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        // numColumns={2}
        renderItem={({ item }) => <ProductCardViewLike item={item} />}
        // contentContainerStyle={styles.container}
        // ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item) => item.id}
        style={{ marginHorizontal: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 65,
    paddingLeft: SIZES.small / 2,
  },
  separator: {
    height: 16,
  },
});
