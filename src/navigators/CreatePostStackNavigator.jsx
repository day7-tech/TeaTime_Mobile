import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatePostOptions from "../features/createPost/containers/CreatePostOptions";
import { ROUTE_CREATE_POST_OPTIONS, ROUTE_NOTES } from "./RouteNames";
import Notes from "../features/createPost/containers/Notes";
import Back from "../components/Navigation/Back";
import BackIcon from "../../assets/images/arrow-left-rectangle.png";

const Stack = createNativeStackNavigator();

const CreatePostStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={CreatePostOptions}
        name={ROUTE_CREATE_POST_OPTIONS}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        component={Notes}
        name={ROUTE_NOTES}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Back
              onPress={() => navigation.goBack()}
              backArrowImage={BackIcon}
            />
          ),
          headerShadowVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default CreatePostStackNavigator;

const styles = StyleSheet.create({});
