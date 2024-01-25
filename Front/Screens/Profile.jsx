import { SafeAreaView, View, Text, Pressable, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES } from "../constants";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Profile() {
  const navigation=useNavigation()
  const[token,setToken]=useState("")
  const[userID,setuserID]=useState("")

  const getData=async()=>{
      const token=await AsyncStorage.getItem("token")
      const userID=await AsyncStorage.getItem("userID")
      setToken(token)
      setuserID(userID)
  }
  getData();
  const logout=async()=>{
    await AsyncStorage.clear()
  }
  if(token)
  {
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image source={require("../home/images/space.jpg")} style={styles.profileImage} resizeMode="cover" />
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
        </View>
        <TouchableOpacity style={styles.button}onPress={()=>navigation.navigate("LogIn")}>
          <Text style={styles.buttonText}>My Favourite</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Cart")}>
          <Text style={styles.buttonText}>My Cart</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.button} onPress={()=>logout()}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }else{
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image source={require("../home/images/space.jpg")} style={styles.profileImage} resizeMode="cover" />
          <Text style={styles.userName}>please LogIn</Text>
          {/* <Text style={styles.userEmail}>john.doe@example.com</Text> */}
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("LogIn")}>
          <Text style={styles.buttonText}>LogIn</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

