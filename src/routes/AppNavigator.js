import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import home from '../screens/home';
import details from '../screens/details';

//const { Navigator, Screen } = createStackNavigator();
const Stack = createStackNavigator();



function HomeNavigator() {
  //welcomeMessage = `There is no user account with the email "${id}".`;
  //todo: make a way to have the username displayed
  //todo: add a logout button
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={home} />
      <Stack.Screen name="Details" component={details} />
    </Stack.Navigator>
  );
}
// no deafaultNavigationOptions? cause new version :()
export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
/*
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
*/