import React, { FC, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../utils/styles";
import Typography from "./Typography/Typography";
import FeedCaption from "./FeedCaption";
import MomentsFeedOptions from "../features/home/components/MomentsFeedOptions";
import ChannelDetails from "./ChannelDetails";
import ChannelAndUploaderDetails from "./ChannelAndUploaderDetails";
import FavouritesFeedOptions from "../features/home/components/FavouritesFeedOptions";

const FeedDetails = ({
  style,
  item,
  onUserDetailsPress,
  defaultLikes,
  isLiked,
  isFavourites,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={{ flex: 4 }}>
        {isFavourites ? (
          <ChannelAndUploaderDetails
            channelImage={item.channel.image}
            channelName={item.channel.name}
            uploaderImage={item.uploader.image}
            uploaderName={item.uploader.name}
            onPress={onUserDetailsPress}
          />
        ) : (
          <ChannelDetails
            channelImage={item.channel.image}
            channelName={item.channel.name}
            onPress={onUserDetailsPress}
          />
        )}
        <FeedCaption caption={item.description} />
      </View>
      {isFavourites ? (
        <FavouritesFeedOptions
          item={item}
          defaultLikes={defaultLikes}
          isLiked={isLiked}
        />
      ) : (
        <MomentsFeedOptions
          item={item}
          defaultLikes={defaultLikes}
          isLiked={isLiked}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

export default FeedDetails;
