import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import BottomBarOptions from "../components/BottomBarOptions";
import { Colors } from "../../../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Typography from "../../../components/Typography/Typography";
import Post from "./Post";
import Video from "./Video";
import Notes from "./Notes";
import { options } from "../../../utils/constants";
import { ROUTE_NOTES } from "../../../navigators/RouteNames";

const CreatePostOptions = ({ navigation }) => {
  const [postType, setPostType] = useState("post");

  useEffect(() => {
    if (postType === "notes") {
      navigation.navigate(ROUTE_NOTES);
    }
  }, [postType]);

  const onClosePress = useCallback(() => {
    navigation.goBack();
  }, []);

  const renderCreatePostOption = useCallback((postType) => {
    switch (postType) {
      case "post":
        return <Post onClosePress={onClosePress} />;
      case "video":
        return <Video onClosePress={onClosePress} />;
      default:
        return null;
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexGrow: 1 }}>{renderCreatePostOption(postType)}</View>
      <BottomBarOptions
        options={options}
        setValue={setPostType}
        value={postType}
      />
    </SafeAreaView>
  );
};

export default CreatePostOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
  },
});
