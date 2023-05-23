import { Video, VideoThumbnails } from "expo-av";
import { VideoProcessing, getThumbnailAsync } from "expo-video-thumbnails";

import React, { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import BottomModal from "../../../components/BottomModal";

import PauseIcon from "../../../../assets/images/pause.png";
import PlayIcon from "../../../../assets/images/play.png";
import Trimmer from "../../../components/MyTrimmer/Trimmer";
import Typography from "../../../components/Typography/Typography";
import { HORIZONTAL_MARGIN } from "../../../utils/constants";
import { Colors } from "../../../utils/styles";
import TrimTimeOptions from "./TrimTimeOptions";

const TrimVideoModal = ({
  trimVideoModalRef,
  fileUri,
  onCancelTrimVideoModalPress,
}) => {
  const [videoUri, setVideoUri] = useState(fileUri);
  const [startFrame, setStartFrame] = useState(0);
  const [endFrame, setEndFrame] = useState(200);
  const [thumbnails, setThumbnails] = useState([]);
  const [trimInterval, setTrimInterval] = useState(null);
  const [isPlay, setPlay] = useState(false);

  const [videoDuration, setVideoDuration] = useState(null);
  const videoRef = useRef(null);

  const generateThumbnails = async () => {
    try {
      const thumbnailOptions = {
        time: [startFrame, endFrame], // Use an array to specify multiple times for thumbnail generation
        quality: 1, // Adjust thumbnail quality if needed
      };

      const thumbnails = await Promise.all(
        thumbnailOptions.time.map(async (time) => {
          const { uri } = await getThumbnailAsync(videoUri, { time });
          return uri;
        })
      );

      setThumbnails(thumbnails);
    } catch (error) {
      console.error("Error generating thumbnails:", error);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    const durationMillis = status.durationMillis;
    setVideoDuration(durationMillis);
  };

  const trimVideo = async () => {
    try {
      const { uri } = await getThumbnailAsync(videoUri, {
        time: startFrame, // Use startFrame as the time for trimming
      });

      console.log("Trimmed video URI:", uri);
    } catch (error) {
      console.error("Error trimming video:", error);
    }
  };

  const handleTrimInterval = (trimIntervalTime) => {
    setStartFrame(0);
    setEndFrame(trimIntervalTime);
    setTrimInterval(trimIntervalTime);
  };

  const onPlayAndPausePress = () => {
    setPlay((value) => !value);
  };

  const onLeftHandleChange = (value) => {
    setStartFrame(value);
    if (trimInterval !== null && endFrame - value !== trimInterval) {
      setTrimInterval(null);
    }
  };

  const onRightHandleChange = (value) => {
    setEndFrame(value);
    if (trimInterval !== null && value - startFrame !== trimInterval) {
      setTrimInterval(null);
    }
  };

  const handleDeselect = () => {
    setTrimInterval(null);
  };

  return (
    <BottomModal
      bottomSheetModalRef={trimVideoModalRef}
      containerStyle={{ flex: 1, paddingHorizontal: 0 }}
      snapPoints={["100%"]}
    >
      {videoUri && (
        <Video
          ref={videoRef}
          source={{ uri: videoUri }}
          style={styles.media}
          resizeMode="cover"
          shouldPlay={isPlay} // Set to false to pause the video initially
          isLooping={true}
          onLoad={generateThumbnails}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />
      )}
      <View style={styles.centerContainer}>
        <Pressable
          style={styles.playPauseContainer}
          onPress={onPlayAndPausePress}
        >
          <Image
            source={!isPlay ? PlayIcon : PauseIcon}
            style={styles.playPauseIcon}
          />
        </Pressable>
        <TrimTimeOptions
          handleButtonPress={handleTrimInterval}
          videoDuration={videoDuration}
          selectedInterval={trimInterval}
          handleDeselect={handleDeselect}
        />
        {videoDuration && thumbnails && (
          <Trimmer
            totalDuration={videoDuration}
            trimmerLeftHandlePosition={startFrame}
            trimmerRightHandlePosition={endFrame}
            onLeftHandleChange={(value) => onLeftHandleChange(value)}
            onRightHandleChange={(value) => onRightHandleChange(value)}
            tintColor={Colors.primary}
            markerColor="#5a3d5c"
            trackBackgroundColor="#382039"
            trackBorderColor="#5a3d5c"
            scrubberColor="#b7e778"
            backgroundImage={thumbnails[1]}
            selectedInterval={trimInterval}
          />
        )}
        <Typography>
          {Number((endFrame - startFrame) / 1000).toFixed(1)} s/
          {Number(videoDuration / 1000, 2).toFixed(1)} s
        </Typography>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.cancelButton}
          onPress={onCancelTrimVideoModalPress}
        >
          <Typography>Cancel</Typography>
        </Pressable>
        <Pressable style={styles.saveButton}>
          <Typography>Save</Typography>
        </Pressable>
      </View>
    </BottomModal>
  );
};

export default TrimVideoModal;

const styles = StyleSheet.create({
  media: {
    // width: SCREEN_WIDTH,
    flex: 1,
  },
  playPauseIcon: {
    tintColor: Colors.white,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: HORIZONTAL_MARGIN,
  },
  cancelButton: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    backgroundColor: "#7D7D7E",
    borderRadius: 26,
  },
  saveButton: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    backgroundColor: Colors.primary,
    borderRadius: 26,
  },
  centerContainer: {
    alignItems: "center",
    paddingHorizontal: HORIZONTAL_MARGIN,
  },
  playPauseContainer: {
    marginVertical: 15,
  },
});
