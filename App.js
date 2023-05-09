import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ModalNavigator from "./src/navigators/ModalNavigator";

export default function App() {
  return (
    <View style={styles.container}>
      <ModalNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
