import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Typography from "./Typography/Typography";
import { Colors } from "../utils/styles";

const ChannelDetails = ({ onPress, channelImage, channelName }) => {
  return (
    <Pressable style={styles.channelDetailsContainer} onPress={onPress}>
      <Image source={{ uri: channelImage }} style={styles.channelImage} />
      <Typography style={styles.channelName}>{channelName}</Typography>
    </Pressable>
  );
};

export default ChannelDetails;

const styles = StyleSheet.create({
  channelDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  channelImage: {
    marginRight: 15,
    width: 55,
    height: 55,
    borderRadius: 55,
  },
  channelName: {
    fontWeight: "bold",
    color: Colors.white,
  },
});
