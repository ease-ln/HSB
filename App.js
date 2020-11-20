import React, { Component } from 'react';
import { StyleSheet, 
         View,
         StatusBar,
         AsyncStorage,
         LogBox
       } from 'react-native';
import {Actions} from 'react-native-router-flux';
import Routes from './src/Routes.js';

import * as firebase from 'firebase';

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
import { Backend } from './src/Backend.js';
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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

//this is to ignore the annoying setting a timer warning
  import { YellowBox } from 'react-native';
  import _ from 'lodash';
  
  YellowBox.ignoreWarnings(['Setting a timer']);
  const _console = _.clone(console);
  console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };

  //LogBox.ignoreLogs();

var currentUserID = null;
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
   /*firebase.auth().onAuthStateChanged(user=>{
     if(user){
      console.log(user.email)
      firebase.auth().signOut();
     }
    });*/

    
    if(Backend.checkLogin())
    {
      console.log("User logged in (App.js)");// currentUserID = Backend.currentUserID();
    }
    else console.log("User is not logged in (App.js)");
  
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
