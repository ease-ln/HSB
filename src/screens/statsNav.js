import React, {Component,useState} from 'react';
import {View, Image, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, TextInput, TouchableOpacity, Button,BackHandler,Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import { Actions } from 'react-native-router-flux';
import { useEffect } from "react";
import * as firebase from 'firebase';

export default function ReportScreen({ route, navigation }) {
    const [markedDates,setMarkedDates] = useState({
        /*'2020-11-04':  {color: '#70d7c7', textColor: 'white'},
        '2020-11-03':  {color: '#70d7c7', textColor: 'white'},*/
    });
    const [days,setDays]= useState(0);
    const [init,setInit]= useState(false);
    var ref = firebase.database().ref('users/'+route.params.pass_username+'/habits/'+route.params.pass_key);
    if(!init)
    {
        setInit(true);
        ref.once('value').then(function(snapshot){
            setDays(snapshot.child('numberOfDays').val());
            var dates = snapshot.child('dates');
            console.log('before loop');
           // var calendarObject = {'2000-11-03':  {color: '#70d7c7', textColor: 'white'},};
            for(var x in dates.val())
            {
                //console.log("Im in the loop rn")
                //console.log(x);
                var s = dates.child(x).child('date').val();
                console.log(s);
               // console.log("Im parsing a date rn")
               //calendarObject[s] = {color: '#70d7c7', textColor: 'white'}
               setMarkedDates((calendarObject)=>{
                calendarObject[s] = {color: '#70d7c7', textColor: 'white'};
                calendarObject = JSON.parse(JSON.stringify(calendarObject));
                return calendarObject;
               })
            }
            
            console.log(JSON.stringify(markedDates));
           
        })
        
    }
    return (
        <View style={styles.container}>
        <Text  style={styles.h1}> Statistics </Text>
          <Calendar
            theme = {{
                backgroundColor: 'blue',
                calendarBackground: '#333043',
                dayTextColor: '#FFFFFF',
                monthTextColor: '#FFFFFF',
              }}
          markingType={'period'}
          markedDates={markedDates}
          />
          <Text style={styles.h1}>Total days: {days}</Text>
        </View>
      );
}
  var Total_days = 0;

 /* {
    '2020-11-03': {marked: true, selectedDotColor: 'blue'},
    '2020-11-16': {disabled: true},
    '2020-11-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
    '2020-11-22': {color: '#70d7c7', textColor: 'white'},
    '2020-11-23': {color: '#70d7c7', textColor: 'white'},
    '2020-11-24': {color: '#70d7c7', textColor: 'white'},
    '2020-11-25': {endingDay: true, color: '#50cebb', textColor: 'white'},
  }*/

/*export default class ReportScreen extends Component<{}> {

  constructor(props) {
    super(props);
    state = {
      email: '',
   }
  }

  componentDidMount() {}
  render() {
    return (
      <View style={styles.container}>
      <Text  style={styles.h1}> Statistics </Text>
        <Calendar
          theme = {{
              backgroundColor: 'blue',
              calendarBackground: '#333043',
              dayTextColor: '#FFFFFF',
              monthTextColor: '#FFFFFF',
            }}
        markingType={'period'}
        markedDates={{
          '2020-11-03': {marked: true, selectedDotColor: 'blue'},
          '2020-11-16': {disabled: true},
          '2020-11-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
          '2020-11-22': {color: '#70d7c7', textColor: 'white'},
          '2020-11-23': {color: '#70d7c7', textColor: 'white'},
          '2020-11-24': {color: '#70d7c7', textColor: 'white'},
          '2020-11-25': {endingDay: true, color: '#50cebb', textColor: 'white'},
        }}
        />
        <Text style={styles.h1}>Total days: {Total_days}</Text>
      </View>
    );
  }
}*/

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#333043',
  },
  h1: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
    color: 'white'
  }
};

const mapStateToProps = state => {
  return {};
};

//export default connect(mapStateToProps, {})(ReportScreen);