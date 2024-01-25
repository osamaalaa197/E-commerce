import React from "react";
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
import { COLORS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ProductList from "../component/Products/ProductList";

export default function NewRivals() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View styl={styles.conatiner}>
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


const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  UpperRow: {
    width: SIZES.width - 50,
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    borderRadius: SIZES.large,
    backgroundColor: COLORS.primary,
    top: SIZES.large,
    zIndex: 999,
  },
  header: {
    fontFamily: "semiBold",
    fontSize: SIZES.large,
    color: COLORS.lightWhite,
    marginLeft: 5,
  },
});
