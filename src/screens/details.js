import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { globalStyles } from '../styles/global';

export default function Details({ route, navigation }) {
    let { title, body, rating, done, key } = route.params.pass_item; // here we extract the other atributes os the review
    let editingHabit = route.params.pass_item;

    //the guy in the comments helped :)
    return (
        <View style={globalStyles.container}>
            
            
            <TextInput
                style={[ {fontSize: 40} ]}
                onChangeText={(title_text) => title = title_text}
                defaultValue = {title}
                placeholder = 'Habit tittle'
            />
            
            <TextInput
                onChangeText={(body_text) => body = body_text}
                defaultValue = {body}
                placeholder = 'Description'
            />
            {/* <Text>{done}</Text> */}
            <Button
                onPress={() => {
                    route.params.pass_editHabit({title: title, rating: rating, body: body, key: key, done: done});
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

        </View>
    )
}
const styles = StyleSheet.create({

    button: {
        marginVertical: 8,
        paddingBottom: 20,
    },
});