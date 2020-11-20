import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button,BackHandler,Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import { Actions } from 'react-native-router-flux';
import { useEffect } from "react";

export default function Details({ route, navigation }) {
    let { name, description, rating, done, key } = route.params.pass_item; // here we extract the other atributes os the review
    let editingHabit = route.params.pass_item;

        

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

        </View>
    )
}
const styles = StyleSheet.create({

    button: {
        marginVertical: 8,
        paddingBottom: 20,
    },
});