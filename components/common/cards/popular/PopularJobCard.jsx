import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";
import { basketball, football, cricket } from "../../../../assets/images/";

const PopularJobCard = ({ item, selectedMotive, handleCardPress, }) => {
  let selectedImage;
  switch (item.sport) {
    case "football":
      selectedImage = football;
      break;
    case "cricket":
      selectedImage = cricket;
      break;
    case "basketball":
      selectedImage = basketball;
      break;
    default:
      // Set a default image or handle the case when image is not found
      selectedImage = image1; // Default to image1
  }
  return (
    <TouchableOpacity
      styles={styles.container(selectedMotive, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity
        style={styles.logoContainer(selectedMotive, item)}
        onPress={() => handleCardPress(item)}
      >
        {/*item.employer_logo*/}
        <Image
          source={item.image ?? selectedImage}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text>{item.motive}</Text>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
