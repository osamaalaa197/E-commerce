import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../../constants";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ProductList from "../ListProduct/ListProduct";
import styles from "./style";
export default function NewRivals() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.conatiner}>
        <View style={styles.wrapper}>
          <View style={styles.UpperRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-circle"
                size={35}
                color={COLORS.lightWhite}
              />
            </TouchableOpacity>
            <Text style={styles.header}>Products</Text>
          </View>
          <ProductList />
        </View>
      </View>
    </SafeAreaView>
  );
}
