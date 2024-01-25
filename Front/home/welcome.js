import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { SIZES, COLORS } from "../constants";
import { TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Welcome() {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcometext}>Find the most </Text>
        <Text style={styles.welcometext2}>luxurious Furniture </Text>
      </View>
      <View style={styles.SearchContainer}>
        <TouchableOpacity>
          <Feather name="search" size={24} style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.SearchInput}
            placeholder="what are you Looking for "
            onFocus={() => navigation.navigate("Search")}
            // onPressIn={() => navigation.navigate('Search')}
            // value=""
          />
        </View>
        {/* <TouchableOpacity onPress={()=>navigation.navigate("Search")}> 
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.SearchInput}
            placeholder="what are you Looking for "
            // onChangeText={() => navigation.navigate("Search")}
            // onPressIn={() => navigation.navigate('Search')}
            // value=""
          />
        </View>
        </TouchableOpacity> */}
        <View>
          <TouchableOpacity style={styles.searchBtm}>
            <Ionicons
              name="camera-outline"
              size={SIZES.xLarge}
              color={COLORS.offwhite}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  welcometext: {
    fontFamily: "bold",
    fontSize: SIZES.xxLarge - 6,
    marginTop: SIZES.xSmall,
    marginHorizontal: 12,
  },
  welcometext2: {
    fontFamily: "bold",
    fontSize: SIZES.xxLarge - 6,
    marginTop: 0,
    color: COLORS.primary,
    marginHorizontal: 12,
  },
  SearchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  SearchInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small,
  },
  searchBtm: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
});
