import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { SCREEN_WIDTH } from "../../../utils/constants";
import { Colors } from "../../../utils/styles";
import Favourites from "./Favourites";
import Moments from "./Moments";
const FirstRoute = () => <Moments />;

const SecondRoute = () => <Favourites />;
const HomeScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "favourites", title: "Favourites" },
    { key: "moments", title: "Moments" },
  ]);

  const renderScene = SceneMap({
    moments: FirstRoute,
    favourites: SecondRoute,
  });

  const renderTabBar = (props) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const isSelected = props.navigationState.index === i;
          return (
            <TouchableOpacity
              key={i}
              style={[styles.tabItem, isSelected && styles.selectedTabItem]}
              onPress={() => setIndex(i)}
            >
              <Text
                style={[styles.tabBarText, isSelected && styles.selectedText]}
              >
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: SCREEN_WIDTH }}
        renderTabBar={renderTabBar}
        lazy={false}
      />
      {/* <Pressable style={styles.searchIcon} onPress={onSearchPress}>
        <Image source={SearchIcon} />
      </Pressable> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    position: "absolute",
    flexDirection: "row",
    zIndex: 1,
    top: 80,
    right: 0,
    left: 0,
    justifyContent: "center",
  },
  selectedTabItem: {
    borderRadius: 25,
    backgroundColor: Colors.whiteOpacity60,
  },
  tabItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 25,
  },
  searchIcon: {
    position: "absolute",
    top: 80,
    right: 20,
  },
  tabBarText: {
    color: Colors.white,
  },
  selectedText: {
    color: Colors.black,
  },
});
