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
import RegistervalidationSchema from "../component/validation/Registervalidation";
import { Formik, validateYupSchema } from "formik";

export default function Register() {
  const navigation = useNavigation();
  // const [username, setUsername] = useState("");
  // const [Email, setEmail] = useState("");
  // const [phonenumber, setphonenumber] = useState("");
  // const [password, setPassword] = useState("");
  // const [location, setlocation] = useState("");
  const handelsubmit = async (values) => {
    try {
      // const DataUser = {
      //   UserName: username,
      //   Email: Email,
      //   PhoneNumber: phonenumber,
      //   Location: location,
      //   Password: password,
      // };
      const response = await axios.post(
        "https://localhost:7120/api/User/Register",
        values,
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
        <Image source={require("../home/images/bk.png")} style={styles.image} />
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f0f0f0",
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
  },
  image: {
    width:"100%",
    height:300, // Half of the container width
    aspectRatio: 1, // Keep the aspect ratio of the image
    marginBottom: 20,
    borderRadius:2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  input: {
    width:350,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 10,
    color: "red",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "maroon",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
