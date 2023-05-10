import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import LikeIcon from "../../../../assets/images/like.png";
import LikedIcon from "../../../../assets/images/liked.png";
import ShareIcon from "../../../../assets/images/share.png";
import ThanksIcon from "../../../../assets/images/thanks.png";
import CommentsIcon from "../../../../assets/images/comments.png";
import CommentedIcon from "../../../../assets/images/commented.png";
import ReplyIcon from "../../../../assets/images/reply.png";
import FeedOption from "../../../components/FeedOption";

const FavouritesFeedOptions = ({
  item,
  defaultLikes,
  isLiked,
  onThanksPress,
}) => {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likeCount);

  const onLikePress = useCallback(() => {
    setLikeCount((prevCount) => (like ? prevCount - 1 : prevCount + 1));
    setLike((prevLike) => !prevLike);
  }, [like]);

  useEffect(() => {
    setLike(isLiked ?? false);
    setLikeCount(defaultLikes ?? item.likeCount);
  }, [isLiked, defaultLikes]);

  const onSharePress = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <FeedOption
        label={"Thanks"}
        imageIcon={ThanksIcon}
        onPress={onThanksPress}
      />
      <FeedOption
        label={likeCount}
        imageIcon={like ? LikedIcon : LikeIcon}
        onPress={onLikePress}
      />
      <FeedOption
        label={"Comments"}
        imageIcon={CommentsIcon}
        onPress={onLikePress}
      />
      <FeedOption
        label={"Reply"}
        imageIcon={ReplyIcon}
        onPress={onSharePress}
      />
    </View>
  );
};

export default FavouritesFeedOptions;

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
});
