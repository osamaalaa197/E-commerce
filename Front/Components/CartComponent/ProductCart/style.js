import { StyleSheet } from "react-native";
import { SIZES, COLORS } from "../../../constants";
const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  UpperRow: {
    width: SIZES.width - 50,
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    borderRadius: SIZES.large,
    backgroundColor: COLORS.primary,
    top: SIZES.large,
    zIndex: 999,
  },
  header: {
    fontFamily: "semiBold",
    fontSize: SIZES.large,
    color: COLORS.lightWhite,
    marginLeft: 5,
  },
});

export default styles;
