import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  KeyboardAvoidingView,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Slider,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../../utils/styles";
import Back from "../../../components/Navigation/Back";
import BackIcon from "../../../../assets/images/back.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { HORIZONTAL_MARGIN, SCREEN_WIDTH } from "../../../utils/constants";
import CustomSlider from "../../../components/CustomSlider";
import { color } from "react-native-reanimated";

const EditPostTextModal = ({
  isModalVisible,
  onCloseModalPress,
  onDonePress,
}) => {
  const [selectedColor, setSelectedColor] = useState(Colors.white);
  const [selectedSize, setSelectedSize] = useState(20);
  const [textValue, setTextValue] = useState("");

  const handleTextChange = (text) => {
    setTextValue(text);
  };

  const handleColorPress = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (value) => {
    setSelectedSize(value);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Modal visible={isModalVisible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.topContainer}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={onCloseModalPress}
            >
              <Image source={BackIcon} style={styles.backIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() =>
                onDonePress(textValue, selectedColor, selectedSize)
              }
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView
            style={styles.editorContainer}
            behavior="padding"
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  zIndex: 1,
                  position: "absolute",
                  left: -120,
                }}
              >
                <CustomSlider
                  value={selectedSize}
                  onValueChange={handleSizeChange}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  marginHorizontal: HORIZONTAL_MARGIN,
                }}
              >
                <TextInput
                  style={[
                    styles.textInput,
                    { color: selectedColor },
                    { fontSize: selectedSize },
                  ]}
                  placeholder="Add text..."
                  placeholderTextColor={selectedColor ?? Colors.white}
                  multiline={true}
                  numberOfLines={4}
                  value={textValue}
                  onChangeText={handleTextChange}
                />
              </View>
            </View>
            <View style={styles.sidebar}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.colorOption, { backgroundColor: Colors.white }]}
                onPress={() => handleColorPress(Colors.white)}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.colorOption, { backgroundColor: Colors.black }]}
                onPress={() => handleColorPress(Colors.black)}
              />

              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.colorOption, { backgroundColor: Colors.green }]}
                onPress={() => handleColorPress(Colors.green)}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.colorOption, { backgroundColor: Colors.yellow }]}
                onPress={() => handleColorPress(Colors.yellow)}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  styles.colorOption,
                  { backgroundColor: Colors.darkPink },
                ]}
                onPress={() => handleColorPress(Colors.darkPink)}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.colorOption, { backgroundColor: Colors.red }]}
                onPress={() => handleColorPress(Colors.red)}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  styles.colorOption,
                  { backgroundColor: Colors.skyBlue },
                ]}
                onPress={() => handleColorPress(Colors.skyBlue)}
              />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EditPostTextModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: HORIZONTAL_MARGIN,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editorContainer: {
    justifyContent: "center",
    flex: 1,
  },
  textInput: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "600",
  },
  sidebar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: Colors.white,
    borderWidth: 2,
  },
  slider: {
    width: 250,
    height: 40,
    marginBottom: 20,
    zIndex: 999,
  },
  doneButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  backIcon: {
    tintColor: Colors.white,
  },
});
