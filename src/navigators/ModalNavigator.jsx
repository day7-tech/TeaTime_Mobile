import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ROUTE_AUTHENTICATED_NAVIGATOR } from "./RouteNames";
import { Colors } from "../utils/styles";
import AuthenticatedNavigator from "./AuthenticatedNavigator";

const ModalStack = createNativeStackNavigator();

const ModalNavigator = ({ style }) => {
  const TransparentTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.white,
    },
  };
  return (
    <NavigationContainer theme={TransparentTheme}>
      <ModalStack.Navigator>
        <ModalStack.Screen
          name={ROUTE_AUTHENTICATED_NAVIGATOR}
          component={AuthenticatedNavigator}
          options={{
            headerShown: false,
          }}
        />
      </ModalStack.Navigator>
    </NavigationContainer>
  );
};

export default ModalNavigator;
