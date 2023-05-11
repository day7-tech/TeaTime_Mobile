import React, { useCallback } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Back from "../../../components/Navigation/Back";
import SearchBar from "../../../components/SearchBar";
import { HORIZONTAL_MARGIN } from "../../../utils/constants";
import HistoryRow from "../components/HistoryRow";
import BackIcon from "../../../../assets/images/back.png";

const SearchScreen = ({ navigation }) => {
  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderItem = useCallback(({ item }) => {
    return (
      <View>
        <HistoryRow searchedText={"Bloom aged care"} />
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardViewContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onBackPress} style={styles.back}>
            <Image source={BackIcon} style={styles.icon} />
          </TouchableOpacity>
          <SearchBar style={styles.searchBarContainer} />
        </View>
        <FlatList
          data={[1, 2, 3]}
          keyExtractor={(item) => item.toString()}
          renderItem={renderItem}
          style={styles.flatlistContainer}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    height: 40,
    flex: 1,
  },
  keyboardViewContainer: {
    paddingHorizontal: HORIZONTAL_MARGIN,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flatlistContainer: {
    marginTop: 10,
  },
  back: {
    justifyContent: "center",
  },
  icon: {
    marginRight: 10,
  },
});

export default SearchScreen;
