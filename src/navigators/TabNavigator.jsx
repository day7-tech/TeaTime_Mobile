import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import TabBarOption from "../components/TabBarOption";
import Typography from "../components/Typography/Typography";
import HomeScreen from "../features/home/containers/HomeScreen";
import { Colors } from "../utils/styles";
import BellIcon from "./../../assets/images/bell.png";
import AddIcon from "./../../assets/images/floating_add.png";
import HomeIcon from "./../../assets/images/home.png";
import ProfileIcon from "./../../assets/images/user.png";
import GroupsIcon from "./../../assets/images/users.png";
import {
  ROUTE_ADD_CONTENT,
  ROUTE_GROUPS_SCREEN,
  ROUTE_HOME_SCREEN,
  ROUTE_NOTIFICATIONS_SCREEN,
  ROUTE_PROFILE_SCREEN
} from "./RouteNames";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={ROUTE_HOME_SCREEN}
      screenOptions={() => ({
        tabBarItemStyle: {
          width: "100%",
        },
        tabBarStyle: {
          backgroundColor: Colors.blackOpacity,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 3,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.white,
      })}
    >
      <Tab.Screen
        component={HomeScreen}
        name={ROUTE_HOME_SCREEN}
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <Typography style={{ color: color, fontSize: 12 }}>Home</Typography>
          ),
          tabBarIcon: ({ color }) => (
            <TabBarOption imageIcon={HomeIcon} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={HomeScreen}
        name={ROUTE_GROUPS_SCREEN}
        options={{
          tabBarLabel: ({ color }) => (
            <Typography style={{ color: color, fontSize: 12 }}>
              Groups
            </Typography>
          ),
          tabBarIcon: ({ color }) => (
            <TabBarOption imageIcon={GroupsIcon} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={HomeScreen}
        name={ROUTE_ADD_CONTENT}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => <TabBarOption imageIcon={AddIcon} />,
        }}
      />
      <Tab.Screen
        component={HomeScreen}
        name={ROUTE_PROFILE_SCREEN}
        options={{
          tabBarLabel: ({ color }) => (
            <Typography style={{ color: color, fontSize: 12 }}>
              Profile
            </Typography>
          ),
          tabBarIcon: ({ color }) => (
            <TabBarOption imageIcon={ProfileIcon} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={HomeScreen}
        name={ROUTE_NOTIFICATIONS_SCREEN}
        options={{
          tabBarLabel: ({ color }) => (
            <Typography style={{ color: color, fontSize: 12 }}>
              Notifications
            </Typography>
          ),
          tabBarIcon: ({ color }) => (
            <TabBarOption imageIcon={BellIcon} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
