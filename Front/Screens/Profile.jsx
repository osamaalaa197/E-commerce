import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES } from "../constants";
import images from "../constants/images";
import axios from "axios";

export default function Profile() {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [userID, setuserID] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem("token");
      const userID = await AsyncStorage.getItem("userID");
      const token2 = localStorage.getItem("token");
      const userID2 = localStorage.getItem("userID");
      setToken(token);
      setToken(token2);
      setuserID(userID);
      setuserID(userID2);
    };
    getData();
    const fetchData = async () => {
      try {
        const userID2 = localStorage.getItem("userID");
        const response = await axios.get(
          `https://urbannestfurniture.somee.com/api/User?id=${userID2}`
        );
        setEmail(response.data.email);
        setUserName(response.data.userName);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const logout = async () => {
    await AsyncStorage.clear();
    setToken(null);
    setuserID(null);
  };

  console.log("the token", token);
  console.log("the ID", userID);

  if (token) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.backgroundImage} source={images.space} />
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image style={styles.profileImage} source={images.profile} />
          </View>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("IsLike")}
          >
            <Ionicons name="heart" size={20} color="#000" />
            <Text style={styles.menuText}>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("IsLike")}
          >
            <MaterialCommunityIcons
              name="truck-delivery"
              size={20}
              color="black"
            />
            <Text style={styles.menuText}>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Cart")}
          >
            <Entypo name="shopping-cart" size={20} color="#000" />
            <Text style={styles.menuText}>Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="cached" size={20} color="black" />
            <Text style={styles.menuText}>Clear Cache</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <AntDesign name="deleteuser" size={20} color="black" />
            <Text style={styles.menuText}>Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={logout}>
            <MaterialIcons name="logout" size={20} color="black" />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.backgroundImage} source={images.space} />
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image style={styles.profileImage} source={images.userDefault} />
          </View>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("LogIn")}
          >
            <Ionicons name="heart" size={20} color="#000" />
            <Text style={styles.menuText}>LogIn</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 200,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: -70,
  },
  profileImageContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#fff",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 14,
    color: "#888",
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 16,
    marginLeft: 20,
  },
});
