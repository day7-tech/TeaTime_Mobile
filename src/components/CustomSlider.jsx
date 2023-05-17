import Slider from "@react-native-community/slider";
import { View, StyleSheet, Image } from "react-native";

import SliderBarImage from "../../assets/images/slider-bar.png";

const CustomSlider = ({ value, onValueChange }) => {
  const handleValueChange = (val) => {
    onValueChange(val);
  };

  const thumbSize = 20 + (value / 100) * 20; // Calculate the thumb size based on the slider value

  const ThumbComponent = () => (
    <View style={[styles.thumb, { width: thumbSize, height: thumbSize }]} />
  );

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderTrack}>
        <Image source={SliderBarImage} style={styles.sliderBar} />
      </View>
      <Slider
        value={value}
        onValueChange={handleValueChange}
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor="transparent"
        maximumTrackTintColor="transparent"
        thumbTintColor="#fff"
        thumbComponent={ThumbComponent}
        inverted // Use custom thumb component
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: "center",
    transform: [{ rotate: "90deg" }],
    position: "absolute",
    width: 240,
  },
  slider: {
    justifyContent: "center",
    transform: [{ rotate: "180deg" }],
  },
  sliderTrack: {
    position: "absolute",
    transform: [{ rotate: "-92deg" }],
  },
  sliderBar: {
    height: 250,
    position: "absolute",
    left: -10,
  },
  thumb: {
    borderRadius: 50,
    backgroundColor: "blue",
  },
});

export default CustomSlider;
