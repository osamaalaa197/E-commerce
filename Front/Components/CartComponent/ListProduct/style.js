import { StyleSheet } from "react-native";
import { SIZES } from "../../../constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cartList: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemBrand: {
    fontSize: 14,
    color: "#888",
  },
  itemPrice: {
    fontSize: 14,
    color: "#333",
  },
  checkoutButton: {
    backgroundColor: "#004d40",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  deleteButton: {
    padding: 5,
  },
  orderInfo: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 15,
  },
  orderInfoText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutAllButton: {
    backgroundColor: "#004d40",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  checkoutAllButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
