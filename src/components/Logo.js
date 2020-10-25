import React, { Component } from 'react';
import { StyleSheet, 
         Text, 
         View, 
         Image
       } from 'react-native';

export default class Logo extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
          <Image  style={{width: 70, height: 70}}
                 source={require('../images/logo.png')}/>
          <Text style={styles.logoText}>Social Habit Building App</Text>
      </View>
          
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    backgroundColor: '#333043',
    alignItems: 'center',
    justifyContent: 'flex-end',
    
  },
  logoText: {
    marginVertical: 15,
    fontSize: 18,
    color: '#adaabd',
  }
});
