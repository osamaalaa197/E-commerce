import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Fontisto,
  AntDesign,
} from "@expo/vector-icons";
import images from "../constants/images";
import { SIZES, COLORS, FONTS } from "../constants/Size2";
import axios from "axios";
import Profile from "./Profile";
import { useNavigation } from "@react-navigation/native";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function LogIn() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handerlSignIn = async () => {
    try {
      const DataUser = {
        UserName: username,
        Password: password,
      };
      const response = await axios.post(
        "https://urbannestfurniture.somee.com/api/User/login",
        DataUser,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const token = response.data.token;
      const userID = response.data.userId;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userID", userID);

      localStorage.setItem("token", token);
      localStorage.setItem("userID", userID);

      navigation.navigate("Home");
    } catch (error) {
      alert("Email or password not vaild");
      navigation.navigate("LogIn");
      console.log(error);
    }
  };
  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={images.bk} // Replace with your image URL
          />
        </View>
        <Text style={styles.title}>Unlimited Luxurious Furniture</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <FontAwesome name="envelope-o" size={20} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Enter UserName"
              placeholderTextColor="#888"
              onChangeText={(value) => setUsername(value)}
              autoCapitalize={"none"}
            />
          </View>
          <View style={styles.inputWrapper}>
            <EvilIcons name="lock" size={30} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              onChangeText={(value) => setPassword(value)}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => handerlSignIn()}
        >
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.registerText}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#000",
  },
  loginButton: {
    backgroundColor: "#004d40",
    paddingVertical: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    color: "#004d40",
    textDecorationLine: "underline",
  },
});
