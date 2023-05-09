import React, { FC } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../utils/styles";
import Typography from "./Typography/Typography";

const FeedOption = ({ style, imageIcon, label, onPress }) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Image source={imageIcon} />
      <Typography style={styles.label}>{label}</Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: "center",
  },
  label: {
    color: Colors.white,
    marginVertical: 8,
  },
});

export default FeedOption;
