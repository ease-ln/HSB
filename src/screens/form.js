import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';

export default function Form({ addHabit}) {

  return (
    
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ title: '', body: '', rating: '' }}
        onSubmit={(values) => { // (values) is the obj with atributes: title, body, etc 
            addHabit(values); // we pass this obj to the addHabit func from home screen
            
        }}
      >
        {props => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder='Habit Title'
              onChangeText={props.handleChange('title')}
              value={props.values.title}
            />

            <TextInput
              style={globalStyles.input}
              multiline
              placeholder='Habit Details'
              onChangeText={props.handleChange('body')}
              value={props.values.body}
            />

            <TextInput 
              style={globalStyles.input}
              placeholder='Sample Parameter (1 - 5)'
              onChangeText={props.handleChange('rating')}
              value={props.values.rating}
              keyboardType='numeric'
            />
            
            <Button color='lightgreen' title="Submit" onPress={props.handleSubmit} /> 
          </View>
        )}
      </Formik>
    </View>
    
  );
}
