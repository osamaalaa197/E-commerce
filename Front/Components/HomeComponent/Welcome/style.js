import { View, Text, StyleSheet, TextInput } from "react-native";
import { SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  welcometext: {
    fontFamily: "bold",
    fontSize: SIZES.xxLarge - 6,
    marginTop: SIZES.xSmall,
    marginHorizontal: 12,
  },
  welcometext2: {
    fontFamily: "bold",
    fontSize: SIZES.xxLarge - 6,
    marginTop: 0,
    color: COLORS.primary,
    marginHorizontal: 12,
  },
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
});

export default styles;
