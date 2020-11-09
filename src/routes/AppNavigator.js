import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home";
import Details from "../screens/details";

const { Navigator, Screen } = createStackNavigator();
//other options: "float", "screen"
// we had headerMode="none" after <Navigator so we had no header
const HomeNavigator = () => (
  <Navigator>
    <Screen 
    name="Home" 
    component={Home}
    options={{
        title: 'My Habbits',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#333', height: 100}
    }}
    />
    <Screen 
    name="Details"
    component={Details}
    options={{
        headerStyle: { backgroundColor: '#999'}
    }}
    />
    
  </Navigator>
);

// no deafaultNavigationOptions? cause new version :()

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);