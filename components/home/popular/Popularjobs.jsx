import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";

import styles from "./popularjobs.style";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import { useQuery } from "react-query";
import blogs from "../../../services/blogs";
import { useRouter } from "expo-router";
PopularJobCard;
const Popularjobs = ({refreshing}) => {
  const navigation = useNavigation();
  const router = useRouter();
  const error = false;
  const { data, isLoading, refetch } = useQuery("blogs", blogs.getAll);
  const [selectedMotive, setSelectedMotive] = useState("");
  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing]);
  const handleCardPress = (item) => {
    console.log(item);
    router.push(`/motives/${item.id}`);
    setSelectedMotive(item);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular now</Text>
        <TouchableOpacity onPress={() => console.log(data)}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something Went Wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                handleCardPress={handleCardPress}
                selectedMotive={selectedMotive}
                key={item.id}
              />
            )}
            keyExtractor={(item) => item?.id.toString()}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
