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
        "https://localhost:7120/api/User/login",
        DataUser,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const token = response.data.token;
      const userID = response.data.userId;
      console.log(token);
      console.log(userID);
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userID", userID);

      //      localStorage.setItem("token", token);
      //  localStorage.setItem("userID", userID);

      navigation.navigate("Home");
    } catch (error) {
      alert("Email or password not vaild");
      navigation.navigate("LogIn");
      console.log(error);
    }
  };
  return (
    <ImageBackground
      source={images.background}
      resizeMode="cover"
      style={{
        flex: 1,
        paddingVertical: SIZES.padding,
        justifyContent: "center",
      }}
    >
      <SafeAreaView>
        <KeyboardAwareScrollView>
          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                source={images.logo}
                resizeMode="contain"
                style={{
                  height: 250,
                  width: 500,
                }}
              />
            </View>
            <View
              style={{
                flex: 3,
                paddingHorizontal: 20,
                paddingVertical: 30,
                marginBottom: -10,
              }}
            >
              <Text style={styles.textAbove}>UserName or Phone Number</Text>
              <View style={styles.textBoxSign}>
                <Image
                  source={images.person}
                  resizeMode="contain"
                  style={{
                    width: 26,
                    height: 40,
                    right: 2,
                    alignSelf: "flex-start",
                  }}
                />
                <TextInput
                  placeholder="Enter your UserName ..."
                  onChangeText={(value) => setUsername(value)}
                  autoCapitalize={"none"}
                  style={{
                    flex: 1,
                    height: 40.5,
                    fontSize: 15,
                    marginLeft: 2,
                  }}
                />
              </View>

              <Text style={{ fontSize: 14, marginLeft: 12, marginTop: 30 }}>
                Password
              </Text>
              <View style={styles.textBoxSign}>
                <Image
                  source={images.lock}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 20,
                    top: 10,
                    alignSelf: "flex-start",
                  }}
                />
                <TextInput
                  placeholder="Enter your password..."
                  onChangeText={(value) => setPassword(value)}
                  style={{
                    flex: 1,
                    height: 40.5,
                    fontSize: 15,
                    marginLeft: 5,
                  }}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity>
                <Text
                  style={{
                    color: COLORS.darkgray,
                    marginBottom: -15,
                    top: 8,
                    alignSelf: "flex-end",
                    right: 25,
                  }}
                >
                  Reset Password
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                  height: 55,
                  marginHorizontal: 30,
                  marginTop: 40,
                  marginBottom: -20,
                  paddingHorizontal: SIZES.radius,
                  borderRadius: 50,
                  backgroundColor: COLORS.primary,
                  ...styles.shadow,
                }}
                onPress={() => handerlSignIn()}
              >
                <View>
                  <Text
                    style={{
                      justifyContent: "center",
                      alignSelf: "center",
                      top: 10,
                      color: COLORS.white,
                      fontSize: 30,
                    }}
                  >
                    Sign In
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.radius * 2.5,
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: COLORS.gray, fontSize: 20 }}>
                  Don't have an account?{" "}
                </Text>

                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.transparent,
                  }}
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontSize: 19,
                    }}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 15,
                  justifyContent: "center",
                  marginBottom: 5,
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "center",
                    height: 65,
                    width: 120,
                    marginHorizontal: 20,
                    marginBottom: -20,
                    borderRadius: 50,
                    backgroundColor: COLORS.white,
                    elevation: 1,
                    ...styles.shadow,
                  }}
                >
                  <Image
                    source={images.google}
                    style={{
                      alignSelf: "center",
                      height: 40,
                      width: 40,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "center",
                    height: 65,
                    width: 120,
                    marginHorizontal: 20,
                    marginBottom: -20,
                    borderRadius: 50,
                    backgroundColor: "#4267B2",
                    elevation: 1,
                    ...styles.shadow,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      alignSelf: "center",
                      fontSize: 40,
                      fontWeight: "bold",
                    }}
                  >
                    f
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000", // for iphone drop shadow (specifies the android equivalent, elevation: 1)
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: SIZES.xxLarge,
    width: SIZES.width - 44,
    zIndex: 999,
  },
  textBoxSign: {
    flexDirection: "row",
    height: 45,
    marginHorizontal: 5,
    marginTop: 5,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray,
    elevation: 2,
  },
  textAbove: { fontSize: 14, marginLeft: 12 },
});
