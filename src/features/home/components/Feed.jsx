import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ResizeMode, Video } from "expo-av";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LikeIcon from "../../../../assets/images/heart.png";
import ShareIcon from "../../../../assets/images/share.png";
import FeedDetails from "../../../components/FeedDetails";
import FeedOption from "../../../components/FeedOption";
import Stickers from "../../../utils/Stickers";
import {
  DOUBLE_TAP_DELAY,
  HORIZONTAL_MARGIN,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../../utils/constants";
import { Colors } from "../../../utils/styles";
import BottomModal from "../../../components/BottomModal";
import RecognitionStickersModal from "../../recognition/containers/RecognitionStickersModal";
import { useNavigation } from "@react-navigation/native";

const Feed = ({ item, isFavourites }) => {
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const doubleTapRef = useRef(null);
  const doubleTapTimerRef = useRef(null);

  const tabBarHeight = useBottomTabBarHeight();
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likeCount);
  const recognitionModalRef = useRef(null);

  const lastTapRef = useRef(null);
  const handleDoubleTap = useCallback(() => {
    const now = Date.now();

    if (lastTapRef.current && now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      clearTimeout(doubleTapTimerRef.current);
      doubleTapTimerRef.current = null;
      handleLike();
    } else {
      lastTapRef.current = now;
      doubleTapTimerRef.current = setTimeout(() => {
        clearTimeout(doubleTapTimerRef.current);
        doubleTapTimerRef.current = null;
        handlePlayPause();
      }, DOUBLE_TAP_DELAY);
    }
  }, [handleLike]);

  const handleLike = useCallback(() => {
    setLike((prevLike) => {
      const newLike = !prevLike;
      setLikeCount((prevCount) => (newLike ? prevCount + 1 : prevCount - 1));
      return newLike;
    });
  }, []);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
    setIsPlaying(true);
  }, []);

  const onThanksPress = useCallback(() => {
    recognitionModalRef?.current?.present();
  }, []);

  return (
    <View style={[styles.container, { height: SCREEN_HEIGHT - tabBarHeight }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleDoubleTap}
        ref={doubleTapRef}
        style={[
          styles.videoWrapper,
          { height: SCREEN_HEIGHT - tabBarHeight, width: SCREEN_WIDTH },
        ]}
      >
        <Video
          ref={videoRef}
          source={{ uri: item.uri }}
          style={styles.video}
          shouldPlay={isPlaying}
          resizeMode={ResizeMode.COVER}
          isLooping
          onLoad={handleVideoLoad}
          isMuted={false}
          volume={0.9}
        />
      </TouchableOpacity>
      <View style={styles.postDetails}>
        <FeedDetails
          item={item}
          defaultLikes={likeCount}
          isLiked={like}
          isFavourites={isFavourites}
          onThanksPress={onThanksPress}
        />
      </View>
      <RecognitionStickersModal
        recognitionModalRef={recognitionModalRef}
        postDetails={item}
        stickers={Stickers}
      />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    justifyContent: "flex-end",
  },
  videoWrapper: {
    position: "absolute",
  },
  video: {
    flex: 1,
  },
  postDetails: {
    marginHorizontal: HORIZONTAL_MARGIN,
  },
});
