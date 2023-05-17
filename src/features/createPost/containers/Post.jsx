import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useRef, useState, useEffect } from "react";
import CloseIcon from "../../../../assets/images/close.png";
import { HORIZONTAL_MARGIN } from "../../../utils/constants";
import { Colors } from "../../../utils/styles";
import { Camera } from "expo-camera";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import GalleryImages from "../components/GalleryImages";
import FlashLightIcon from "../../../../assets/images/light.png";
import PhotoClickIcon from "../../../../assets/images/photo-click.png";
import ChangeCameraIcon from "../../../../assets/images/change-camera.png";
import FaceMasksIcon from "../../../../assets/images/face-masks.png";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import CameraComponent from "../components/CameraComponent";
import { ROUTE_EDITING } from "../../../navigators/RouteNames";

const Post = ({ onClosePress }) => {
  const navigation = useNavigation();
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef();
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [micPermission, requestMicPermission] =
    Camera.useMicrophonePermissions();
  const [isLoading, setIsLoading] = useState(true);

  const saveFileToLocal = useCallback(async (uri) => {
    const fileName = uri.split("/").pop();
    const fileExtension = fileName.split(".").pop();
    const tempFileUri = `${
      FileSystem.documentDirectory
    }${Date.now()}.${fileExtension}`;

    try {
      await FileSystem.copyAsync({
        from: uri,
        to: tempFileUri,
      });

      console.log("File saved temporarily at:", tempFileUri);
      return tempFileUri;
    } catch (error) {
      console.error("Error saving file:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Enable the camera when the screen is focused
      if (!cameraPermission?.granted || !micPermission?.granted) {
        // Camera or mic permissions are not granted yet
        if (!cameraPermission?.granted) await requestCameraPermission();
        if (!micPermission?.granted) await requestMicPermission();
      }

      setIsCameraEnabled(true);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const onCameraReady = useCallback(() => {
    setIsCameraEnabled(true);
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Do something with the selected image or video
      const tempFileUri = await saveFileToLocal(result.assets[0].uri);
      navigation.navigate(ROUTE_EDITING, { fileUri: tempFileUri });
    }
  };

  const toggleFlash = () => {
    setFlashMode((prevFlashMode) =>
      prevFlashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  };

  const switchCamera = () => {
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const tempFileUri = await saveFileToLocal(data.uri);
      navigation.navigate(ROUTE_EDITING, { fileUri: tempFileUri });
    }
  };

  const handleMediaCapture = (fileUri) => {
    // Handle the captured image here
  };

  if (isLoading || !cameraPermission || !micPermission) {
    // Camera permissions are still loading
    return <ActivityIndicator size="large" color="#fff" />;
  }

  return (
    <View style={styles.container}>
      {isCameraEnabled && (
        <Camera
          style={
            Platform.OS === "android" ? { aspectRatio: 9 / 16 } : { flex: 1 }
          }
          type={cameraType}
          flashMode={flashMode}
          ref={cameraRef}
          ratio={"16:9"}
          onCameraReady={onCameraReady}
        >
          <View style={styles.topButtonContainer}>
            <Pressable onPress={onClosePress} style={styles.closeButton}>
              <Image source={CloseIcon} />
            </Pressable>
          </View>
          <View style={styles.bottomButtonContainer}>
            <Pressable onPress={pickImage}>
              <GalleryImages />
            </Pressable>
            <Pressable onPress={toggleFlash} style={styles.flashButton}>
              <Image source={FlashLightIcon} />
            </Pressable>
            <Pressable onPress={takePicture} style={styles.flashButton}>
              <Image source={PhotoClickIcon} />
            </Pressable>
            <Pressable onPress={switchCamera} style={styles.flashButton}>
              <Image source={ChangeCameraIcon} />
            </Pressable>
            <Pressable onPress={toggleFlash} style={styles.flashButton}>
              <Image source={FaceMasksIcon} />
            </Pressable>
          </View>
        </Camera>
      )}
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  bottomButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  topButtonContainer: {
    flex: 1,
    padding: HORIZONTAL_MARGIN,
  },
});
