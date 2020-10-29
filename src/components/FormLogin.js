import React, { Component } from 'react';
import { StyleSheet, 
         Text, 
         View,
         Image,
         Alert, 
         TextInput,
         TouchableOpacity
       } from 'react-native';
import {Actions} from 'react-native-router-flux';

import {Backend as Backend} from '../Backend';

export default class Logo extends Component<{}> {
  forgotpassword() {
    Actions.forgotpassword()
  }

  constructor(props)
  {
    super(props)
    this.state = {
      id: '',
      password: '',
   }
  }

  handleId = (text) => {
    this.setState({ id: text })   
}
handlePassword = (text) => {
    this.setState({ password: text })   
}
  

  render() {
    return (
      <View style={styles.container}>

        <View style ={styles.imageandinputtext}> 
          <Image  style={styles.icons}
                  source={require('../images/icon2.png')}/>
          <TextInput  style={styles.inputBox} 
                      underlineColorAndroid='rgba(0,0,0,0)'
                      placeholder="Email"
                      keyboardType="email-address"
                      placeholderTextColor="#d3d0e5"
                      ref={(input) => this.password = input}
                      onChangeText = {this.handleId}
          />
        </View>

        < View style ={styles.imageandinputtext}> 
          <Image  style={styles.icons}
                  source={require('../images/icon1.png')}
                  />
          <TextInput  style={styles.inputBox} 
                      secureTextEntry = {true}
                      underlineColorAndroid='rgba(0,0,0,0)' 
                      placeholder="Password"
                      placeholderTextColor="#d3d0e5"
                      selectionColor="#040"
                      onSubmitEditing={()=> this.password.focus()}
                      onChangeText = {this.handlePassword}
                      />
        </View>



        <TouchableOpacity style={styles.button} onPress = {()=>Backend.loginUser(this.state.id,this.state.password)}>
          <Text style = {styles.buttonText} >{this.props.type}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.forgotpassword}>
          <Text style = {styles.forgotpassword}> Forgot password?</Text>
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

  icons: {
    width: 40,
    height: 45,
    marginVertical: 10,
  },

  imageandinputtext: {
    flexDirection: 'row',
  },

  forgotpassword: {
    color:'#e5e4e9',
    marginTop: 10,

  },
});