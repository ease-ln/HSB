
import * as firebase from 'firebase';
import { Component } from 'react';

import { StyleSheet, 
  Text, 
  View,
  Alert, 
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export class Backend {
    //signs up the user
    static signUpUser = (username, email, password) => {
      if (username.length < 5) {
        console.log(`The username is too short (It should be at least 5 characters)`);
        Alert.alert(
          'Username error!',
          `The username is too short (It should be at least 5 characters)`,
          [
            {
              text: 'OK',
            }
          ],
          { cancelable: false }
        );
        return;
      }
      if (username.length > 40) {
        console.log(`The username is too long (It can be 40 characters at most)`);
        Alert.alert(
          'Username error!',
          `The username is too long (It can be 40 characters at most)`,
          [
            {
              text: 'OK',
            }
          ],
          { cancelable: false }
        );
        return;
      }
      firebase.database().ref("users").once("value").then(function (snapshot) {
        if (snapshot.child(username).val() != null) {
          console.log(`The username ${username} is already in use.`);
          Alert.alert(
            'Username error!',
            `The username ${username} is already in use.`,
            [
              {
                text: 'OK',
              }
            ],
            { cancelable: false }
          );
          return;
        }
      });


      firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) { console.log(user); })
        .catch(error => {
          switch (error.code) {

            case 'auth/email-already-in-use':
              console.log(`Email address ${email} already in use.`);
              Alert.alert(
                'Email error!',
                `Email address "${email}" already in use.`,
                [
                  {
                    text: 'OK',
                  }
                ],
                { cancelable: false }
              );
              break;
            case 'auth/invalid-email':
              console.log(`Email address ${email} is invalid.`);
              Alert.alert(
                'Email error!',
                `Email address ${email} is invalid.`,
                [
                  {
                    text: 'OK',
                  }
                ],
                { cancelable: false }
              );
              break;
            case 'auth/operation-not-allowed':
              console.log(`Error during sign up.`);
              Alert.alert(
                'Unknown error!' `Error during sign up.`,
                [
                  {
                    text: 'OK',
                  }
                ],
                { cancelable: false }
              );
              break;
            case 'auth/weak-password':
              console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
              Alert.alert(
                'Password error!',
                'Password is not strong enough. Add additional characters including special characters and numbers.',
                [
                  {
                    text: 'OK',
                  }
                ],
                { cancelable: false }
              );
              break;
            default:
              console.log(error.message);
              break;

          }
        });
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase.database().ref("users/" + username).set({ emailAdress: email, uid: username });
          //this._storeData();  //if everything ok save data local storage and redirect to myhabit page
          Actions.myhabits();
        }
      });
    }

    //logs in the user 
    //todo make this support login with username instead of password
    static loginUser = (id,password) => {
        firebase.auth().signInWithEmailAndPassword(id,password).catch(function (error){
          switch (error.code) {
             case 'auth/invalid-email':
               console.log(`Email address ${id} is invalid.`);
               Alert.alert(
                'Email error!',
                `Email address ${id} is invalid.`,
                [
                  {
                    text: 'OK',
                  }
                ],
                { cancelable: false }
              )  
               break;
               case 'auth/user-not-found':
               console.log(`There is no user account with the email "${id}".`);
               Alert.alert(
                'Email error!',
                `There is no user account with the email "${id}".`,
                [
                  {
                    text: 'OK',
                  }
                ],
                { cancelable: false }
              )  
               break;
             case 'auth/operation-not-allowed':
               console.log(`Error during sign up.`);
               Alert.alert(
                 'Unknown error!',
                `Error during sign up.`,
                [
                  {
                    text: 'OK',
                  }
                ],
                { cancelable: false }
              )  
               break;
             case 'auth/wrong-password':
               console.log('The password entered is not valid.');
               Alert.alert(
                 'Wrong password!',
                'The password entered is not valid.',
                [
                  {
                    text: 'OK',
                  }
                ],
                { cancelable: false }
               )
               break;
             default:
               console.log(error.message);
               break;
          
       }
       return;
        });
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            Actions.myhabits();
          }
        });
    }

    //sends an email for password reset
    static forgotPassword = (email) => {
        firebase.auth().sendPasswordResetEmail(email).then(function() {
            Alert.alert(
                'Email sent!',
                `An email was sent to ${email} with a link to reset the password.`,
                [
                  {
                    text: 'OK',
                  }
                ],
                { cancelable: false }
              )
            Actions.login();
          }).catch(function(error) {
            switch(error.code)
            {
                case 'auth/invalid-email':
               console.log(`Email address ${id} is invalid.`);
               Alert.alert(
                'Email error!',
                `Email address ${id} is invalid.`,
                [
                  {
                    text: 'OK',
                  }
                ],
                { cancelable: false }
              )  
               break;
               case 'auth/user-not-found':
               console.log(`There is no user account with the email "${id}".`);
               Alert.alert(
                'Email error!',
                `There is no user account with the email "${id}".`,
                [
                  {
                    text: 'OK',
                  }
                ],
                { cancelable: false }
              )  
               break;
               default:
                console.log(`Unknown error ${error.code}`);
                Alert.alert(
                 'Email error!',
                 `Unknown error ${error.code}`,
                 [
                   {
                     text: 'OK',
                   }
                 ],
                 { cancelable: false }
               )  
            }
          });
    }
    static checkLogin(){ 
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user is logged');
        console.log(user.email);
      }
      else
      {
        console.log('User is not logged in');
      }
      firebase.auth().signOut();
      console.log('User signed out!');
      Actions.login();
})
}
}