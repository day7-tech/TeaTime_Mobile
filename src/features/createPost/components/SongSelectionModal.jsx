import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import BottomModal from "../../../components/BottomModal";
import { generateRandomMusic } from "../../../services/generateRandomContent";
import Typography from "../../../components/Typography/Typography";
import SongCard from "../../../components/Cards/SongCard";
import CloseIcon from "../../../../assets/images/close.png";
import { HORIZONTAL_MARGIN } from "../../../utils/constants";
import { Audio } from "expo-av";

const SongSelectionModal = ({ songSelectionModalRef, onClosePress }) => {
  const [songs] = useState(generateRandomMusic());
  const [playingSongId, setPlayingSongId] = useState("");
  const [selectedSongId, setSelectedSongId] = useState("");
  const soundObject = useRef(new Audio.Sound()).current;

  useEffect(() => {
    return () => {
      // Stop the song playback when the modal is closed
      stopAudioPlayback();
    };
  }, []);

  const stopAudioPlayback = async () => {
    try {
      if (playingSongId) {
        await soundObject.stopAsync();
        await soundObject.unloadAsync();
        setPlayingSongId("");
      }
    } catch (error) {
      // Discard error
    }
  };

  return (
    <BottomModal
      bottomSheetModalRef={songSelectionModalRef}
      containerStyle={{ flex: 1 }}
      snapPoints={["100%"]}
    >
      <View>
        <Pressable onPress={onClosePress} style={styles.closeButton}>
          <Image source={CloseIcon} />
        </Pressable>
        <Typography style={styles.text}>Choose a song for the post</Typography>
        <FlatList
          data={songs}
          renderItem={(song) => (
            <SongCard
              isPlaying={playingSongId === song.item.id}
              setIsPlaying={(b) => {
                if (b) {
                  setPlayingSongId(song.item.id);
                } else {
                  setPlayingSongId("");
                }
              }}
              uri={song.item.uri}
              name={song.item.name}
              details={song.item.details}
              isSelected={selectedSongId === song.item.id}
              setIsSelected={() => setSelectedSongId(song.item.id)}
            />
          )}
          keyExtractor={(song) => song.id}
        />
      </View>
    </BottomModal>
  );
};

export default SongSelectionModal;

const styles = StyleSheet.create({
  closeButton: {
    marginTop: 55,
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
});
