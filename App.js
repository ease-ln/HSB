import React, { Component } from 'react';
import { StyleSheet, 
         View,
         StatusBar,
         AsyncStorage
       } from 'react-native';
import {Actions} from 'react-native-router-flux';
import Routes from './src/Routes';

import * as firebase from 'firebase';

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBEzmwEqo6tNnIiFss0zFva3jasR3Vl9Pw",
    authDomain: "social-habit-app.firebaseapp.com",
    databaseURL: "https://social-habit-app.firebaseio.com",
    projectId: "social-habit-app",
    storageBucket: "social-habit-app.appspot.com",
    messagingSenderId: "849123477708",
    appId: "1:849123477708:web:1c78bab1fdbc42412d5a69"
};

firebase.initializeApp(firebaseConfig);

export default class App extends Component<{}> {
  /*_storeData = async () => {
   try {
    const value = await AsyncStorage.getItem('Loginuser')
    if(value == 1){
    //await AsyncStorage.remove('Loginuser')
    Actions.myhabits()
       }
      }
   catch{
    alert('error')
   }
  }*/

 
  render() {
   // this._storeData()
    return (
      <View style = {styles.container}>
        <StatusBar
          backgroundColor = '#333043'
          barStyle = 'light-content'
        />
        <Routes/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333043',
    justifyContent: 'center',
  },
});
