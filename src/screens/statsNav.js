import React, {Component,useState} from 'react';
import {View, Image, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, TextInput, TouchableOpacity, Button,BackHandler,Alert ,FlatList} from 'react-native';
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
    const [otherTotalDays,setOtherTotalDays] = useState([]);
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
        
        firebase.database().ref('habits/'+route.params.pass_key+'/users').once('value').then(function(snapshot)
        {
            setOtherTotalDays([]);
            firebase.database().ref('users').once('value').then(function(snap){
                
            for(var uid in snapshot.val())
            {
                var localSnap = snap.child(uid+'/habits/'+route.params.pass_key+'/numberOfDays');
                console.log(uid +"  (start of loop)");
                console.log(otherTotalDays);
                console.log("still start of loop");     
                if(uid==route.params.pass_username) continue;
                
                    setOtherTotalDays((curr)=>{
                        var tmp = curr.filter(item => item.username != uid && item.username != route.params.pass_username);
                        console.log('after the filter function');
                        console.log(tmp);
                        return [{username:uid,days:localSnap.val()}, ...tmp];
                    })
                
                console.log(uid +"  (end of loop)");  
                    }
                    console.log("After the last iteration of the loop");
                    console.log(otherTotalDays);
                    setOtherTotalDays((curr)=>{
                        var tmp = curr.filter(item => item.username != route.params.pass_username)
                       return tmp;
                    })
                    console.log(route.params.pass_username);
    })})
       
        
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
          <Text style={styles.h1}>Other users' total days:</Text>

          <FlatList
                data={otherTotalDays}
                renderItem={({ item }) => (
                <Text style={styles.h2}>{item.username} : {item.days}</Text>
                )}
            />
        </View>
      );
}
 

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
  },
  h2: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: 'white'
  }
};

const mapStateToProps = state => {
  return {};
};