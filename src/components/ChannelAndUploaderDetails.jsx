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
        <Image source={{ uri: channelImage }} style={styles.channelImage} />
        <Image source={{ uri: uploaderImage }} style={styles.uploaderImage} />
      </View>
      <View>
        <Typography style={styles.channelName}>{channelName}</Typography>
        <Typography style={styles.uploaderName}>
          Posted by {uploaderName}
        </Typography>
      </View>
    </Pressable>
  );
};

export default ChannelAndUploaderDetails;

const styles = StyleSheet.create({
  channelImage: {
    marginRight: 15,
    width: 55,
    height: 55,
    borderRadius: 55,
  },
  uploaderName: {
    color: Colors.white,
  },
  channelDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  uploaderImage: {
    width: 26,
    height: 26,
    borderRadius: 26,
    position: "absolute",
    bottom: -2,
    right: 5,
  },
  channelName: {
    fontWeight: "bold",
    color: Colors.white,
    paddingBottom: 3,
  },
});
