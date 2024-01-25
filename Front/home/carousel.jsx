import React from "react";
import { View, StyleSheet } from "react-native";
// import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from "../constants";
import { SliderBox } from "react-native-image-slider-box";

export default function Carousel() {
  const slider = [
    "https://res.cloudinary.com/dcfbdln3v/image/upload/v1689592238/fn5_ogaimc.jpg",
    "https://res.cloudinary.com/dcfbdln3v/image/upload/v1689592238/fn4_yabr2d.jpg",
    "https://res.cloudinary.com/dcfbdln3v/image/upload/v1689592234/fn3_zvjfas.jpg",
    "https://res.cloudinary.com/dcfbdln3v/image/upload/v1689592182/fn2_wkfz8i.jpg",
    "https://res.cloudinary.com/dcfbdln3v/image/upload/v1689592173/fn1_qtxoa9.jpg"
  ];

  return (
    <View style={styles.container}>
      <SliderBox
        images={slider}
        dotColor={COLORS.primary}
        ImageComponentStyle={{borderRadius:15,width:"93%",marginTop:15 }}
        autoplay
        circleLoop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
