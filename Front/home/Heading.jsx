import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { SIZES, COLORS } from "../constants";
import { TouchableOpacity } from "react-native";
import {  Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Heading() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Rivals</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("ListProduct")}>
          <Ionicons name="ios-grid" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
    marginBottom: -SIZES.small,
    marginHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: "semiBold",
    fontSize: SIZES.xLarge - 2,
    color: COLORS.black,
  },
});
