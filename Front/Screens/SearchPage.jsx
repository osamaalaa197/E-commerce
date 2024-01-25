import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES, COLORS } from "../constants";
import { TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import ProductList from "../component/Products/ProductList";
import ProductCardView from "../component/Products/ProductCardView";
import SearchList from "../component/Products/SearchList";

export default function SearchPage() {
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const searchpressHandler = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7120/api/Product/title?title=${searchKey}`
      );
      console.log(response);
      setsearchResult(response.data);
      console.log("result", searchResult);

      // return (
      //   <View>
      //     <FlatList data={searchResult}
      //     renderItem={({item})=> <ProductCardView item={item}/>} />
      //     {/* <ProductList item={searchResult} /> */}
      //   </View>
      // );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.SearchContainer}>
        <TouchableOpacity>
          <Ionicons
            name="camera-outline"
            style={styles.searchIcon}
            size={SIZES.xLarge}
          />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.SearchInput}
            placeholder="what are you Looking for "
            // onPressIn={() => navigation.navigate("Search")}
            value={searchKey}
            onChangeText={setSearchKey}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchBtm}
            onPress={() => searchpressHandler()}
          >
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      {searchResult.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../home/images/Pose23.png")}
            style={styles.searchImg}
          />
        </View>
      ) : (
        <FlatList
          data={searchResult}
          key={(item) => item.id}
          renderItem={({ item }) => 
          // <Text>{item.title}</Text>
          // <ProductCardView item={item}/>
          <SearchList item={item}/>
        }
        style={{marginHorizontal:12}}
        />
        // <ProductCardView item={searchResult} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  searchImg: {
    resizeMode: "contain",
    width: SIZES.width - 100,
    height: SIZES.height - 300,
    opacity: 0.9,
  },
});
