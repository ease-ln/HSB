import * as firebase from 'firebase';
import { Component, setState } from 'react';
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
var err = 0;
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
       // ret = false;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) { 
          //map both ways
          console.log("User added to auth");
          id = firebase.auth().currentUser.uid;
            firebase.database().ref("users/" + username).set({ emailAdress: email, uid: username, authId:id });
            firebase.database().ref("usernames/" + id).set({uid: username });
            console.log("User added to db");
            Actions.myhabits();
           // this.loginUser(id,password);
           // this._storeData();  //if everything ok save data local storage and redirect to myhabit page
            //todo: what is reset?
           // Actions.reset('myhabits') 
         }).catch(error => {
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
      });
    }


    //logs in the user 
    //todo make this support login with username instead of password
    static loginUser = (id,password) => {
        /*_storeData = async () => {
            try {
              await AsyncStorage.setItem(
                'Logeduser',
                '1'
              )
            } catch {
            }
        }*/
        firebase.auth().signInWithEmailAndPassword(id,password).then(function(){
               //this._storeData();
                //Actions.reset('myhabits') 
                Actions.myhabits();
          }).catch(function(error) {
          switch (error.code) {
             case 'auth/invalid-email':
               console.log(`Email address ${id} ${err}is invalid.`);
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
    return firebase.auth().currentUser != null;

}
    static logoutUser()
    {
      firebase.auth().signOut();
      Actions.login();
      console.log("user logged out");
      //todo: add an alert here for confirmation
    }
    static currentUserID()
    {
      uid = firebase.auth().currentUser.uid;
      var data;
      data =  firebase.database().ref("usernames/"+uid).once('value').then(function(snapshot){
        return snapshot.child("uid").val();
      });
      return data;
    }


    //adds a new habit to the user
    static addHabit(name,description)
    {
      refUser = firebase.database().ref("users/"+this.currentUserID()+"/habits");
      return refUser.once("value").then(function(snapshot){
        if (snapshot.child(name).val() != null)  //incompatible with the database
        {
          //has a habit with the same name
          Alert.alert(
            'Invalid name!',
            `You already have a habit with the exact same name!`,
            [
              {
                text: 'OK',
              }
            ],
            { cancelable: false }
          );
          return false;
        }
        //generate habit ID (global counter) and push to the habits list
        refHabits = firebase.database().ref("habits");
        var ID = refHabits.push({
          id: ID,
              name: name,
              description: description
        }).key;
        //todo: add the user to the list of habit users
        refUser.child(ID).set({
          addedBy: this.currentUserID(),
          new: true,
          numberOfDays: 0,
          id: ID,
          name: name,
          description: description
        });
        //todo: how to add the dates
        return true;
      })
    }

    static editHabit(oldname,name,description)
    {
      //take the ID from the users habit list and update the name and description of it 
      //todo: will this reset the habit for all users?
      firebase.database().ref("habits/"+id+"/name").set(name);
      firebase.database().ref("habits/"+id+"/description").set(description);
    }

    static deleteHabit(name)
    {
      //delete the habit but just from the user's list

    }

    static tickHabit(id)
    {
      refUser = firebase.database().ref("users/"+this.currentUserID()+"/habits");
      //ticks the habit by adding a day to the list of days
      var keyOfLastTick = refUser.child(id+"/dates").push({
        date: this.getDate()
      }).key;
      refUser.child(id+"/dates/lastDate").set(keyOfLastTick);
      //increment days
      refUser.child(id).once("value").then(function(snapshot){
        var oldValue = snapshot.child("numberOfDays").val();
        refUser.child(id+"/numberOfDays").set(oldValue+1);
      })
      this.setAccessDate();
    }

    static getDate()
    {
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      return year+"-"+month+"-"+date;
    }

    static setAccessDate()
    {
      firebase.database().ref("users/"+this.currentUserID()+"/lastAccessDate").set(this.getDate());
    }

    static untickHabit(name)
    {
      //removes the current day from the list of days of the habit
      this.setAccessDate();
    }

    static fetchHabits()
    {
      //returns the list of habits of the current user
      refUser = firebase.database().ref("users/"+this.currentUserID()+"/habits");
      var arr = [];

      refUser.once('value').then(function(snapshot){
        for(var id in snapshot.val())
        {
          var element = [snapshot.child(id).val()];
          arr.push.apply(arr,element);
        }  //there might be a problem with async
      });
      return arr;
    }

    static addUserToHabit(username,habit)
    {
      //adds the habit to the other user's list of habits
      //marks it as new with the name of the user who added it
      //when the other user is logged in again, he will receive a notification/alert about this
      //the above can be done easily in firebase
    }

    static fillCalendar(id)
    {
      //sets the input data for the calendar and gives it to the calendar front
    }

    static getTotalDays(id)
    {
      refUser = firebase.database().ref("users/"+this.currentUserID()+"/habits");
      //returns the number of days (size of the list of days)
      return refUser.child(id).once("value").then(function(snapshot){
        return snapshot.child("numberOfDays").val();  
      })
    }
}