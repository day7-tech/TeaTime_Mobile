import { StyleSheet, Text, View, Image } from "react-native";
import * as MediaLibrary from "expo-media-library";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../utils/styles";

const GalleryImages = ({ mediaType = "photo" }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const media = await MediaLibrary.getAssetsAsync({
          mediaType: "",
        });
        setPhotos(media.assets.slice(0, 1)); // limit to the 3 most recent photos
      }
    })();
  }, []);

  return (
    <View>
      {photos.length > 0 &&
        photos.map((photo, index) => (
          <Image
            key={photo.id}
            source={{ uri: photo.uri }}
            style={[styles.photo]}
          />
        ))}
    </View>
  );
};

export default GalleryImages;

const styles = StyleSheet.create({
  overlay: {
    borderRadius: 1,
    borderColor: Colors.white,
    borderRadius: 10,
  },
  photo: {
    width: 40,
    height: 40,
    borderColor: Colors.white,
    borderRadius: 10,
    borderWidth: 2,
  },
});
