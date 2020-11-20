import React, { Component } from 'react';
import { StyleSheet, 
         Text, 
         View, 
         TouchableOpacity,
         StatusBar,
         Alert
       } from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/FormLogin';

import {Actions} from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import { Backend } from '../Backend';


export default class Login extends Component<{}> {
 /* _storeData = async () => {
   try {
    var value = await AsyncStorage.getItem("Logeduser")
    if(value == 1){
    //await AsyncStorage.remove('Loginuser')
       Actions.reset('myhabits') 

       }
      }
   catch{
    alert('error')
   }
}*/
  render() {
    //this._storeData()
    //console.log("login page reached");
   // if(Backend.checkLogin()) Actions.myhabits();
    return (
      <View style = {styles.container}>
        <Logo/>
        <Form type="Login"/>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Don't have an account yet?</Text>
          <TouchableOpacity onPress={Actions.signup}><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333043',
    alignItems: 'center',
    justifyContent: 'center',
  },

  signupText: {
    fontSize: 16,
    color: '#8f8e94'
  },

  signupButton: {
    fontSize: 16,
    color: '#e5e4e9'
  },

  signupTextCont: {
    flexGrow: 0.1,
    alignItems: "flex-end",
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 15,
  },
   signupText: {
    color:'rgba(255,255,255,0.6)',
    fontSize:16
  },
});

