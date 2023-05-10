import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ROUTE_RECOGNITION_STACK_NAVIGATOR,
  ROUTE_TAB_NAVIGATOR,
} from "./RouteNames";
import TabNavigator from "./TabNavigator";
import RecogniseStackNavigator from "./RecogniseStackNavigator";

const Stack = createNativeStackNavigator();

const AuthenticatedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={TabNavigator}
        name={ROUTE_TAB_NAVIGATOR}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={RecogniseStackNavigator}
        name={ROUTE_RECOGNITION_STACK_NAVIGATOR}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedNavigator;

const styles = StyleSheet.create({});
