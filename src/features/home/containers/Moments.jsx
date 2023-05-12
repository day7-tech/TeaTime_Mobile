import { Animated, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { generateDummyVideoPosts } from "../../../services/generateRandomContent";
import Feed from "../components/Feed";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../utils/constants";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const Moments = () => {
  const [videos, setVideos] = React.useState(generateDummyVideoPosts(0, 10));
  const flatListRef = useRef(null);
  const scrollOffsetRef = useRef(0);
  const scrollDirectionRef = useRef(null);
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
    return <Feed item={item} isFavourites={false} />;
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={videos}
        renderItem={renderVideo}
        onEndReached={loadMoreVideos}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => `${item.id}`}
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={SCREEN_HEIGHT - tabBarHeight}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Moments;

const styles = StyleSheet.create({});
