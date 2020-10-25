import React, { Component } from 'react';
import { StyleSheet, 
         Text, 
         View, 
         StatusBar,
         TouchableOpacity
      } from 'react-native';

export default class Signup extends Component<{}> {

  render() {
    return (
      <View style = {styles.container}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    color: '#080808',
    fontWeight: '500'
  },

  signupTextCont: {
    flexGrow: 0.1,
    alignItems: "flex-end",
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingVertical: 15,
  }
});

