import React, {Component, setState } from 'react';
import { StyleSheet, 
         Alert, 
         TextInput, 
         View, 
         Text,
         TouchableOpacity,
         StatusBar
       } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Backend} from '../Backend';
export default class ForgotPassword extends Component<{}> {
  state = {
      email: '',
   }
  handleEmail = (text) => {
      this.setState({ email: text })   
  }
  login() {
    Actions.pop()
  }
  render() {
    return (
        <View style ={styles.container}> 
        <TouchableOpacity style={styles.back}>
          <Text style={styles.buttonback} onPress = {this.login}>{'<'}</Text>
        </TouchableOpacity>          
        <TextInput  style={styles.inputBox} 
                      underlineColorAndroid='rgba(0,0,0,0)'
                      placeholder="Email"
                      keyboardType="email-address"
                      placeholderTextColor="#d3d0e5"
                      onChangeText = {this.handleEmail}
          />
        <TouchableOpacity style={styles.button}  onPress={() => Backend.forgotPassword(this.state.email, null)}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333043',

  },

  inputBox: {
    width: 270,
    height: 45,
    paddingHorizontal: 16,
    marginVertical: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    color: '#adaabd',
    borderBottomColor: '#adaabd',
  },

  button: {
    marginTop:20,
    backgroundColor: '#e9e9e9',
    borderRadius: 25,
    width: 300,
    height: 40,
    borderWidth: 2,
    justifyContent: 'center',
    borderColor: '#e5e4e9'
  },

  buttonText: {
    fontSize: 16,
    fontWeight:'500',
    color:'#040404',
    textAlign: 'center',
  },

  buttonback: {
    fontSize: 25,
    color:'#9b97ac',
    textAlign: 'center',
  },

  back: {
    position: 'absolute',
    top: 30,
    left: 20,
    backgroundColor: '#333043',
    borderRadius: 25,
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#9b97ac'
  },
});

