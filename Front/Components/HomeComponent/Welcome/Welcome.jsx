import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { SIZES, COLORS } from "../../../constants";
import { TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";

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
