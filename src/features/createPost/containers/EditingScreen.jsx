import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useReducer, useRef, useState } from "react";
import {
  HORIZONTAL_MARGIN,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../../utils/constants";
import CloseIcon from "../../../../assets/images/close.png";
import { SafeAreaView } from "react-native-safe-area-context";
import EditingOptions from "../components/EditingOptions";
import EditPostTextModal from "../components/EditPostTextModal";
import DraggableText from "../components/DraggableText";
import { Colors } from "../../../utils/styles";
import { useNavigation } from "@react-navigation/native";
import SongSelectionModal from "../components/SongSelectionModal";
import StickerSelectionModal from "../components/StickerSelectionModal";

const EditingScreen = ({ route }) => {
  const navigation = useNavigation();
  const { fileUri } = route.params;
  const [isTextModalVisible, setTextModalVisible] = useState(false);
  const [isMusicModalVisible, setMusicModalVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [displayColor, setDisplayColor] = useState(Colors.white);
  const [displayTextSize, setDisplayTextSize] = useState(20);
  const songSelectionModalRef = useRef(null);
  const stickerSelectionModalRef = useRef(null);

  const onClosePress = useCallback(() => {
    navigation.goBack();
  }, []);

  const onTextPress = useCallback(() => {
    setTextModalVisible(true);
  }, []);

  const onCloseModalPress = useCallback(() => {
    setTextModalVisible(false);
  }, []);

  const onDoneTextEditingPress = useCallback(
    (textValue, selectedColor, selectedSize) => {
      setDisplayText(textValue);
      setDisplayColor(selectedColor);
      setDisplayTextSize(selectedSize);
      setTextModalVisible(false);
    },
    []
  );

  const onMusicPress = useCallback(() => {
    songSelectionModalRef?.current?.present();
  }, []);

  const onSongSelectionModalClosePress = useCallback(() => {
    songSelectionModalRef?.current?.close();
  }, []);

  const onStickerPress = useCallback(() => {
    stickerSelectionModalRef?.current?.present();
  }, []);

  const onStickerSelectionModalClosePress = useCallback(() => {
    stickerSelectionModalRef?.current?.close();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: fileUri }}
        style={styles.media}
        resizeMode="cover"
      />
      <View style={styles.topContainer}>
        {!isTextModalVisible && (
          <Pressable onPress={onClosePress} style={styles.closeButton}>
            <Image source={CloseIcon} />
          </Pressable>
        )}
      </View>
      <View style={{ flex: 1 }}>
        {displayText && !isTextModalVisible && (
          <DraggableText
            inputValue={displayText}
            textColor={displayColor}
            fontSize={displayTextSize}
            onEditTextPress={onTextPress}
          />
        )}
      </View>
      {!isTextModalVisible && (
        <View style={styles.bottomContainer}>
          <EditingOptions
            onTextPress={onTextPress}
            onMusicPress={onMusicPress}
            onStickerPress={onStickerPress}
          />
        </View>
      )}
      <EditPostTextModal
        isModalVisible={isTextModalVisible}
        onCloseModalPress={onCloseModalPress}
        onDonePress={onDoneTextEditingPress}
      />
      <SongSelectionModal
        songSelectionModalRef={songSelectionModalRef}
        onClosePress={onSongSelectionModalClosePress}
      />
      <StickerSelectionModal
        stickerSelectionModalRef={stickerSelectionModalRef}
        onClosePress={onStickerSelectionModalClosePress}
      />
    </SafeAreaView>
  );
};

export default EditingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
  },
  media: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: "absolute",
    flex: 1,
  },
  closeButton: {
    padding: HORIZONTAL_MARGIN,
  },
  topContainer: {
    flex: 1,
  },
  bottomContainer: {
    marginBottom: 40,
  },
});
