import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import { BottomSheet } from "react-native-btr";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Colors } from "../utils/styles";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Typography from "./Typography/Typography";
import { HORIZONTAL_MARGIN } from "../utils/constants";

const BottomModal = ({
  children,
  bottomSheetModalRef,
  onClose,
  containerStyle,
}) => {
  const snapPoints = ["80%"];
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.5}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onDismiss={onClose}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetContainer}
    >
      <BottomSheetScrollView
        contentContainerStyle={[styles.contentContainer, containerStyle]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    borderRadius: 30,
    backgroundColor: Colors.black,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: getBottomSpace(),
    paddingHorizontal: HORIZONTAL_MARGIN,
  },
});
