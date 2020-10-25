import React, { Component, setState} from 'react';
import { StyleSheet, 
         Text, 
         View,
         Alert, 
         Image,
         TextInput,
         TouchableOpacity,
         AsyncStorage
       } from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Form extends Component<{}> {

  _storeData = async () => {
  try {
    await AsyncStorage.setItem(
      'Loginuser',
      '1'
    );
  } catch (error) {
    alert("error")
  }
  }

  state = {
      username: '',
      email: '',
      password: '',
      UserNameUniquness: false, //this 3 for front end checks
      EmailUniquness: false,
      Password_Validness: false,
   }
    handleUserName = (text) => {
      this.setState({ username: text });
  }
  handleEmail = (text) => {
      this.setState({ email: text })   
  }
  handlePassword = (text) => {
      this.setState({ password: text })   
  }
  validation = (username, email, password) => {
    this.state.UserNameUniquness = true //for front // back have to implemet
    this.state.EmailUniquness = true //for front // back have to implemet
    this.state.Password_Validness = true //for front // back have to implemet

    if(username.length < 5 || username.length > 40 || !this.state.UserNameUniquness) {
      Alert.alert(
        'UserName error!',
        'Please check you usernamae.',
        [
          {
            text: 'OK',
          }
        ],
        { cancelable: false }
      )  
    }
    else if(email.includes('@')!=true || !this.state.EmailUniquness) {
      Alert.alert(
        'Email error!',
        'Please check you Email.',
        [
          {
            text: 'OK',
          }
        ],
        { cancelable: false }
      )  
    }
    else if(!this.state.Password_Validness) {
      Alert.alert(
        'Email error!',
        'Please check you password.',
        [
          {
            text: 'OK',
          }
        ],
        { cancelable: false }
      )  
    }
    else {
        this._storeData()  //if everything ok save data local storage and redirect to myhabit page
        Actions.myhabits()
    }
    }
  render() {
    return (
      <View style={styles.container}>

        <View style = {styles.imageandinputtext}> 
          <Image  style = {styles.icons}
                  source = {require('../images/icon1.png')}
                  />
          <TextInput  style = {styles.inputBox} 
                      placeholder = "UserName"
                      placeholderTextColor = "#d3d0e5"
                      selectionColor="#040"
                      keyboardType = "email-address"
                      onChangeText = {this.handleUserName}
                      />
        </View>

        <View style ={styles.imageandinputtext}> 
          <Image  style={styles.icons}
                  source={require('../images/icon2.png')}/>
          <TextInput  style={styles.inputBox} 
                      underlineColorAndroid='rgba(0,0,0,0)'
                      placeholder="Email"
                      keyboardType="email-address"
                      placeholderTextColor="#d3d0e5"
                      onChangeText = {this.handleEmail}

          />
        </View>

        < View style ={styles.imageandinputtext}> 
          <Image  style={styles.icons}
                  source={require('../images/icon1.png')}
                  />
          <TextInput  style={styles.inputBox} 
                      underlineColorAndroid='rgba(0,0,0,0)' 
                      placeholder="Password"
                      placeholderTextColor="#d3d0e5"
                      selectionColor="#040"
                      secureTextEntry={true}
                      onChangeText = {this.handlePassword}
                      />
        </View>

        <TouchableOpacity style={styles.button}  onPress={() => this.validation(this.state.username, this.state.email, this.state.password)}>
          <Text style={styles.buttonText}>{this.props.type}</Text>
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

});