import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { generateDummyVideoPosts } from "../../../services/generateRandomContent";
import Feed from "../components/Feed";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SCREEN_HEIGHT } from "../../../utils/constants";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const Favourites = ({ isFocused }) => {
  const navigation = useNavigation();
  const [videos, setVideos] = useState(generateDummyVideoPosts(0, 10));
  const flatListRef = useRef(null);
  const scrollOffsetRef = useRef(0);
  const tabBarHeight = useBottomTabBarHeight();
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [activeTab, setActiveTab] = useState("favourites");
  const [pauseVideo, setPauseVideo] = useState(false);

  /**
   * Load more videos.
   * Generates additional video posts and appends them to the current list.
   */
  const loadMoreVideos = () => {
    const newVideos = [
      ...videos,
      ...generateDummyVideoPosts(videos.length, videos.length + 10),
    ];
    setVideos(newVideos);
  };

  /**
   * Render video item.
   * @param {object} item - Video item.
   * @returns {JSX.Element} - Rendered video component.
   */
  const renderVideo = ({ item }) => {
    return (
      <Feed
        item={item}
        isFavourites={true}
        height={SCREEN_HEIGHT - tabBarHeight}
        currentVideoId={currentVideoId}
      />
    );
  };
  useEffect(() => {
    // Autoplay the first video when the component mounts
    if (videos.length > 0) {
      setCurrentVideoId(videos[0].id);
    } else {
      setCurrentVideoId(null);
    }

    // Clean up and pause the videos when the component unmounts or loses focus
    return () => {
      setCurrentVideoId(null);
    };
  }, [isFocused]);
  const handleScroll = useCallback(
    ({ nativeEvent }) => {
      const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
      const screenHeight = layoutMeasurement.height;
      const scrollPosition = contentOffset.y;

      // Only update the current video ID when the active tab is "favourites"
      const visibleVideoIndex = Math.floor(scrollPosition / screenHeight);
      const visibleVideo = videos[visibleVideoIndex];
      if (visibleVideo) {
        setCurrentVideoId(visibleVideo.id);
      }
    },
    [videos]
  );

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
        onScroll={handleScroll}
      />
    </View>
  );
};

export default React.memo(Favourites);
