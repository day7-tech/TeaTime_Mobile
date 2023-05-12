import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { generateDummyVideoPosts } from "../../../services/generateRandomContent";
import Feed from "../components/Feed";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SCREEN_HEIGHT } from "../../../utils/constants";

const Favourites = () => {
  const [videos, setVideos] = useState(generateDummyVideoPosts(0, 10));
  const flatListRef = useRef(null);
  const scrollOffsetRef = useRef(0);
  const tabBarHeight = useBottomTabBarHeight();

  const loadMoreVideos = () => {
    // Generate additional video posts and append them to the current list
    const newVideos = [
      ...videos,
      ...generateDummyVideoPosts(videos.length, videos.length + 10),
    ];
    setVideos(newVideos);
  };

  const renderVideo = ({ item }) => {
    return <Feed item={item} isFavourites={true} />;
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={videos}
        renderItem={renderVideo}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreVideos}
        onEndReachedThreshold={0.5}
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={SCREEN_HEIGHT - tabBarHeight}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({});
