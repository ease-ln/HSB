import React, { Component } from 'react';
import { StyleSheet, 
         View,
         StatusBar,
         AsyncStorage
       } from 'react-native';
import {Actions} from 'react-native-router-flux';
import Routes from './src/Routes';

export default class App extends Component<{}> {
  _storeData = async () => {
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
}
  render() {
    this._storeData()
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
