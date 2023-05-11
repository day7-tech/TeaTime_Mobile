import { Animated, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { generateDummyVideoPosts } from "../../../services/generateRandomContent";
import Feed from "../components/Feed";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../utils/constants";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const Moments = () => {
  const [videos, setVideos] = React.useState(generateDummyVideoPosts(0, 10));

  // Create a reference to the FlatList component
  const flatListRef = useRef(null);

  // Get the height of the bottom tab bar using the useBottomTabBarHeight hook
  const tabBarHeight = useBottomTabBarHeight();

  // Function to load additional video posts when the user reaches the end of the list
  const loadMoreVideos = () => {
    // Generate additional video posts and append them to the current list
    const newVideos = [
      ...videos,
      ...generateDummyVideoPosts(videos.length, videos.length + 10),
    ];
    setVideos(newVideos);
  };

  // Function to render a single video post
  const renderVideo = ({ item }) => {
    return (
      <Feed
        item={item}
        isFavourites={false}
        height={SCREEN_HEIGHT - tabBarHeight}
      />
    );
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
        // Set the behavior for snapping to the start of each video post
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={SCREEN_HEIGHT - tabBarHeight}
        // Hide the vertical scroll bar
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Moments;

const styles = StyleSheet.create({});
