import React, { Component } from 'react';
import { StyleSheet, 
         View,
         StatusBar,
         AsyncStorage,
         LogBox
       } from 'react-native';
import {Actions} from 'react-native-router-flux';
import Routes from './src/Routes.js';


export default class loading extends Component<{}> {
  

 
  render() {
  
    return (
      <View style = {styles.container}>
        <Text>Loading...</Text>
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
