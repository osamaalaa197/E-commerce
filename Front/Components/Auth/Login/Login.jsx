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
import images from "../../../constants/images";
import axios from "axios";
import Profile from "../../../Screen/Home";
import { useNavigation } from "@react-navigation/native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./style";
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
        "https://www.urbannestfurniture.somee.com/api/User/login",
        { DataUser },
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
