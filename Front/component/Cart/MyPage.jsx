import React from "react";
import { View, Text, Button } from "react-native";

const MyPage = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 20 }}>Cart</Text>
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 16 }}>Order Info</Text>
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 16 }}>Subtotal: $799.99</Text>
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 16 }}>Total: $799.99</Text>
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 16 }}>Kids' Bunk Bed</Text>
        <Text style={{ fontSize: 16 }}>Playful Interiors</Text>
        <Text style={{ fontSize: 16 }}>$799.99 * 1</Text>
      </View>
      <View style={{ marginBottom: 16 }}>
        <Button title="CHECKOUT $799.99" color="#841584" />
      </View>
    </View>
  );
};

export default MyPage;
