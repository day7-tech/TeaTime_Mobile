import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Typography from "./Typography/Typography";
import { Colors } from "../utils/styles";

const FeedCaption = ({ caption }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCaptionPress = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <TouchableOpacity
      onPress={handleCaptionPress}
      activeOpacity={0.8}
      style={styles.captionContainer}
    >
      <Typography
        style={styles.caption}
        numberOfLines={isExpanded ? undefined : 2}
      >
        {caption}
      </Typography>
      {!isExpanded && <Typography style={styles.moreOption}>More</Typography>}
    </TouchableOpacity>
  );
};

export default FeedCaption;

const styles = StyleSheet.create({
  caption: {
    color: Colors.white,
  },
  moreOption: {
    color: Colors.white,
    fontWeight: "bold",
    marginTop: 4,
  },
  captionContainer: {
    marginVertical: 15,
  },
});
