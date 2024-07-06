// // import React from "react";
// // import { View, StyleSheet } from "react-native";
// // import { COLORS } from "../../constants";
// // import { SliderBox } from "react-native-image-slider-box";

// // export default function Carousel() {
// //   const slider = [
// //     "https://res.cloudinary.com/dcfbdln3v/image/upload/v1689592238/fn5_ogaimc.jpg",
// //     "https://res.cloudinary.com/dcfbdln3v/image/upload/v1689592238/fn4_yabr2d.jpg",
// //     "https://res.cloudinary.com/dcfbdln3v/image/upload/v1689592234/fn3_zvjfas.jpg",
// //     "https://res.cloudinary.com/dcfbdln3v/image/upload/v1689592182/fn2_wkfz8i.jpg",
// //     "https://res.cloudinary.com/dcfbdln3v/image/upload/v1689592173/fn1_qtxoa9.jpg",
// //   ];

// //   return (
// //     <View style={styles.container}>
// //       <SliderBox
// //         images={slider}
// //         dotColor={COLORS.primary}
// //         ImageComponentStyle={{ borderRadius: 15, width: "93%", marginTop: 15 }}
// //         autoplay
// //         circleLoop
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: "center",
// //   },
// // });

// import React from "react";
// import { View, StyleSheet, Image, Dimensions } from "react-native";
// import Swiper from "react-native-swiper";
// import { COLORS, SIZES } from "../../constants";

// const { width } = Dimensions.get("window");

// const Carousel = () => {
//   const sliderImages = [
//     "https://res.cloudinary.com/dcfbdln3v/image/upload/v1689592238/fn5_ogaimc.jpg",
//     "https://res.cloudinary.com/dcfbdln3v/image/upload/v1689592238/fn4_yabr2d.jpg",
//     "https://res.cloudinary.com/dcfbdln3v/image/upload/v1689592234/fn3_zvjfas.jpg",
//     "https://res.cloudinary.com/dcfbdln3v/image/upload/v1689592182/fn2_wkfz8i.jpg",
//     "https://res.cloudinary.com/dcfbdln3v/image/upload/v1689592173/fn1_qtxoa9.jpg",
//   ];

//   return (
//     <View style={styles.container}>
//       <Swiper
//         autoplay
//         autoplayTimeout={2.5}
//         dotColor={COLORS.primary}
//         activeDotColor={COLORS.primary}
//         paginationStyle={styles.paginationStyle}
//         style={styles.wrapper}
//         //         ImageComponentStyle={{ borderRadius: 15, width: "93%", marginTop: 15 }}
//       >
//         {sliderImages.map((image, index) => (
//           <View key={index} style={styles.slide}>
//             <Image
//               source={{ uri: image }}
//               style={{ borderRadius: 15, width: "93%", marginTop: 15 }}
//             />
//           </View>
//         ))}
//       </Swiper>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//   },
//   wrapper: {},
//   slide: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "transparent",
//   },
//   image: {
//     width: "auto",
//     height: SIZES.xSmall,
//     flex: 1,
//     resizeMode: "cover",
//   },
//   paginationStyle: {
//     bottom: 10,
//   },
// });

// export default Carousel;
