import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import RegistervalidationSchema from "../Register/validation/Registervalidation";
import { Formik, validateYupSchema } from "formik";
import styles from "./style";
export default function Register() {
  const navigation = useNavigation();
  const handelsubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://localhost:7120/api/User/Register",
        { values },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      navigation.navigate("LogIn");
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Image
            source={require("../../../images/bk.png")}
            style={styles.image}
          />
          <Text style={styles.title}>Sign up and Start shopping</Text>
          <Formik
            initialValues={{
              UserName: "",
              Email: "",
              PhoneNumber: "",
              Location: "",
              Password: "",
            }}
            validationSchema={RegistervalidationSchema}
            onSubmit={(values) => {
              handelsubmit(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
              <View>
                <Text style={styles.label}>Username</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your UserName"
                  onBlur={handleBlur("UserName")}
                  onChangeText={handleChange("UserName")}
                  value={values.UserName}
                />
                {errors.UserName && (
                  <Text style={styles.errorText}>{errors.UserName}</Text>
                )}
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your Password"
                  onBlur={handleBlur("Password")}
                  onChangeText={handleChange("Password")}
                  value={values.Password}
                  secureTextEntry
                />
                {errors.Password && (
                  <Text style={styles.errorText}>{errors.Password}</Text>
                )}
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your Email"
                  onBlur={handleBlur("Email")}
                  onChangeText={handleChange("Email")}
                  value={values.Email}
                />
                {errors.Email && (
                  <Text style={styles.errorText}>{errors.Email}</Text>
                )}
                <Text style={styles.label}>PhoneNumber</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Enter Your PhoneNumber"
                  onBlur={handleBlur("PhoneNumber")}
                  onChangeText={handleChange("PhoneNumber")}
                  value={values.PhoneNumber}
                />
                {errors.PhoneNumber && (
                  <Text style={styles.errorText}>{errors.PhoneNumber}</Text>
                )}
                <Text style={styles.label}>Location</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Enter Your Location"
                  onBlur={handleBlur("Location")}
                  onChangeText={handleChange("Location")}
                  value={values.Location}
                />
                {errors.Location && (
                  <Text style={styles.errorText}>{errors.Location}</Text>
                )}
                <Button title="Submit" color="maroon" onPress={handleSubmit} />
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
}
