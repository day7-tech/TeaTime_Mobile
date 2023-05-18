import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import BottomModal from "../../../components/BottomModal";
import Stickers from "../../../utils/Stickers";
import StickerSelectionGrid from "../../../components/StickerSelectionGrid/StickerSelectionGrid";
import CloseIcon from "../../../../assets/images/close.png";

const StickerSelectionModal = ({ stickerSelectionModalRef, onClosePress }) => {
  const [selectedSticker, setSelectedSticker] = useState(null);
  return (
    <BottomModal
      bottomSheetModalRef={stickerSelectionModalRef}
      snapPoints={["95%"]}
      bottomSheetContainerStyle={styles.container}
    >
      <Pressable onPress={onClosePress} style={styles.closeButton}>
        <Image source={CloseIcon} />
      </Pressable>
      <StickerSelectionGrid
        selectedSticker={selectedSticker}
        setSelectedSticker={setSelectedSticker}
        images={Stickers}
      />
    </BottomModal>
  );
};

export default StickerSelectionModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5F5F5F",
    opacity: 0.7,
  },
  closeButton: {
    // marginTop: 60,
  },
});
