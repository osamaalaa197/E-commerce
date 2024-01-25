import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import ProductCardView from "./ProductCardView";
import useFetch from "../../hooks/useFetch";
import axios from 'axios';

export default function ProductRaw() {
  // const {data,isLoading,error}=useFetch()
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://127.0.0.1:7120/api/Product");
        // const response = await axios.get("https://localhost:44339/api/Product");

        console.log(response)
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const product = data;
  return (
    <View style={{ marginTop: SIZES.medium }}>
        <FlatList
          data={product}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCardView item={item} />}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.medium }}
        />
    </View>
  );
}
