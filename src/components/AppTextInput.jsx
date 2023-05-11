import React, { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../utils/styles";

const AppTextInput = ({
  textStyle,
  containerStyle,
  multiline,
  suffixComponent,
  ...otherProps
}) => {
  return (
    <View
      style={[
        styles.container,
        containerStyle,
        multiline ? styles.containerMultilineOffset : {},
      ]}
    >
      <TextInput
        style={[styles.input, textStyle]}
        placeholderTextColor={
          otherProps.placeholderTextColor ?? Colors.darkGrey
        }
        selectionColor={Colors.primary}
        {...otherProps}
      />
      {suffixComponent && suffixComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  containerMultilineOffset: {
    paddingTop: 7,
  },
  input: {
    lineHeight: 20,
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
});

export default AppTextInput;
