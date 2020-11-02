import React, {useState} from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

export default function AddHabit() {
    const [text, setText] = useState(''); // tracks the input


    const changeHandler = (val) => {
        setText(val);
    }
    return (
        <View>
            <TextInput
                style = {styles.input}
                placeholder = 'type a habit here'
                onChangeText = {changeHandler} // it automatically passes "val" to the changeHandler somehow
            />
            <Button onPres={() => console.log(text)} title="Add the habit" color='#333043'/>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 15,
        marginTop: 15,
        borderColor: 'gray',
        borderBottomWidth: 1,

    }
})