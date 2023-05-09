import React from "react";
import { Image, View } from "react-native";

const TabBarOption = ({ imageIcon, color, style, height }) => {
  const tabHeight = height;
  return (
    <View style={{ height: tabHeight }}>
      <Image
        source={imageIcon}
        style={[
          {
            tintColor: color,
          },
          style,
        ]}
      />
    </View>
  );
};

export default TabBarOption;
