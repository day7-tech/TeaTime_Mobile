import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Typography from "./Typography/Typography";
import { Colors } from "../utils/styles";

const ChannelAndUploaderDetails = ({
  channelImage,
  channelName,
  uploaderImage,
  uploaderName,
}) => {
  return (
    <Pressable style={styles.channelDetailsContainer}>
      <View style={styles.userDetails}>
        <Image source={{ uri: uploaderImage }} style={styles.uploaderImage} />
        <Image source={{ uri: channelImage }} style={styles.channelImage} />
      </View>
      <View>
        <Typography style={styles.uploaderName}>{uploaderName}</Typography>
        <Typography style={styles.channelName}>{channelName}</Typography>
      </View>
    </Pressable>
  );
};

export default ChannelAndUploaderDetails;

const styles = StyleSheet.create({
  channelImage: {
    width: 26,
    height: 26,
    borderRadius: 26,
    position: "absolute",
    bottom: -2,
    right: 5,
  },
  uploaderName: {
    fontWeight: "bold",
    color: Colors.white,
    paddingBottom: 5,
  },
  channelDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  uploaderImage: {
    marginRight: 15,
    width: 55,
    height: 55,
    borderRadius: 55,
  },
  channelName: {
    color: Colors.white,
    lineHeight: 14,
  },
});
