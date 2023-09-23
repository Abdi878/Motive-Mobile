import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { SIZES, icons, sizes } from "../../../constants";
import styles from "./welcome.style";
import { useQuery } from "react-query";
import axios from "axios";

const Welcome = () => {
  const router = useRouter();
  const categories = ["Basketball", "Football", "Cricket", "Tennis"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [search,setSearch]= useState("")
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Abdinasir</Text>
        <Text style={styles.welcomeMessage}>Find games near you</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={search}
            onChange={(e) => {setSearch(e.target.value)}}
            placeholder="What are you looking for"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeCategory, item)}
              onPress={() => {
                setActiveCategory(item);
              }}
            >
              <View style={{flexDirection:"row",alignItems:"center",gap:5}}>
                <Text style={styles.tabText(activeCategory, item)}>{item}</Text>
                <Icon name="basketball-ball" />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        ></FlatList>
      </View>
    </View>
  );
};

export default Welcome;
