import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ROUTE_RECOGNITION_STACK_NAVIGATOR,
  ROUTE_TAB_NAVIGATOR,
  ROUTE_USER_DETAILS_STACK_NAVIGATOR,
} from "./RouteNames";
import TabNavigator from "./TabNavigator";
import RecogniseStackNavigator from "./RecogniseStackNavigator";
import UserDetailsStackNavigator from "./UserDetailsStackNavigator";

const Stack = createNativeStackNavigator();

// AuthenticatedNavigator component
// Renders a stack navigator with multiple screens/components
// Returns: an authenticated navigator component
const AuthenticatedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={TabNavigator}
        name={ROUTE_TAB_NAVIGATOR}
        options={{
          headerShown: false, // Hide the header for the screen
        }}
      />
      <Stack.Screen
        component={RecogniseStackNavigator}
        name={ROUTE_RECOGNITION_STACK_NAVIGATOR}
        options={{
          headerShown: false, // Hide the header for the screen
        }}
      />
      <Stack.Screen
        component={UserDetailsStackNavigator}
        name={ROUTE_USER_DETAILS_STACK_NAVIGATOR}
        options={{
          headerShown: false, // Hide the header for the screen
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedNavigator;

const styles = StyleSheet.create({});
