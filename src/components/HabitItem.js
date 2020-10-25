import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Habit( {item, pressHandler}) {
    return (
        //todo why do we need anonymous func?
        <TouchableOpacity onPress={() => pressHandler(item.key)}>
            <Text style={styles.item}> {item.text}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    item: {
        padding: 15,
        marginTop: 15,
        backgroundColor: '#f5f5f5',
        // borderColor: 'gray',
        // borderWidth: 1,

    }
})