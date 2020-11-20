import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button,BackHandler,Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import { Actions } from 'react-native-router-flux';
import { useEffect } from "react";
import * as firebase from 'firebase';

export default function Details({ route, navigation }) {
    let { name, description, rating, done, key} = route.params.pass_item; // here we extract the other atributes os the review
    let editingHabit = route.params.pass_item;
    var username = '';
    var currentUser = route.params.pass_username;
    if(firebase.auth().currentUser!=null)
    {
        var uid =  firebase.auth().currentUser.uid;
        firebase.database().ref("usernames/"+uid).once('value').then(function(snapshot){
        currentUser = snapshot.child("uid").val();
        console.log('Retrieved username from firebase (details.js)');
      });
    }
    const addUser = ()=>
    {
        firebase.database().ref('users/'+username).once('value').then(function(snapshot){
            if(snapshot.val()==null)
            {
                Alert.alert(
                    'Invalid username!',
                    `There is no user with the username ${username}`,
                    [
                      {
                        text: 'OK',
                      }
                    ],
                    { cancelable: false }
                  )  
                return;
            }
            console.log('Valid user, adding habit');
            console.log('     current user: '+currentUser);
            firebase.database().ref('users/'+username+'/habits/'+key).set({
                name: name,
                description: description,
                id: key,
                new: true,
                addedBy: currentUser,
                lastDate: 'never'
            })
        })
    }

    useEffect(() => {
        const backAction = () => {
            if(name=='') route.params.pass_deleteHabit(key);
            console.log("back pressed");
            navigation.goBack();
            };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

    //the guy in the comments helped :)
    return (
        <View style={globalStyles.container}>
            
            
            <TextInput
                style={[ {fontSize: 40} ]}
                onChangeText={(title_text) => name = title_text}
                defaultValue = {name}
                placeholder = 'Habit name'
            />
            
            <TextInput
                onChangeText={(body_text) => description = body_text}
                defaultValue = {description}
                placeholder = 'Description'
            />
            {/* <Text>{done}</Text> */}
            <Button
                onPress={() => {
                    route.params.pass_editHabit({name: name, rating: rating, description: description, key: key, done: done});
                    navigation.goBack();
                    }
                }
                title = "Apply Changes"
                color = '#00A9A5' 
            />

            <Button
                onPress={() => {
                    route.params.pass_deleteHabit(key);
                    navigation.goBack();
                    }
                }
                title= "Delete the Habit"
                color = '#4E8098' 
            />
            <Button
                onPress={() => {
                     Actions.statistics()
                    }
                }
                title= "Statistics"
                color = '#00A9A5' 
            />
            <Text></Text>
            <TextInput
                onChangeText={(body_text) => username = body_text}
                defaultValue = ''
                placeholder = 'Enter a username, to add him to the habit'
            />
            <Button
                onPress={addUser}
                title= "Add User"
                color = '#00A9A5' 
            />
        </View>
    )
}
const styles = StyleSheet.create({

    button: {
        marginVertical: 8,
        paddingBottom: 20,
    },
});