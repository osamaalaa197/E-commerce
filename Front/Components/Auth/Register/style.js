import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300, // Half of the container width
    aspectRatio: 1, // Keep the aspect ratio of the image
    marginBottom: 20,
    borderRadius: 2,
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
    width: 350,
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

export default styles;
