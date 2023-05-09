import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { generateDummyVideoPosts } from "../../../services/generateRandomContent";

const Moments = () => {
  const [videos, setVideos] = React.useState(generateDummyVideoPosts(0, 10));
  return (
    <View>
      <Text>Moments</Text>
    </View>
  );
};

export default Moments;

const styles = StyleSheet.create({});
