import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTE_TAB_NAVIGATOR } from "./RouteNames";
import TabNavigator from "./TabNavigator";

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
    </Stack.Navigator>
  );
};

export default AuthenticatedNavigator;

const styles = StyleSheet.create({});
