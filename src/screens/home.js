import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Card from '../shared/card'
import { color } from 'react-native-reanimated';

import {Backend} from '../Backend';
import * as firebase from 'firebase';

// {navigation} as an arg means that when we call Home from navigator we pass some obj 
// and we only need a "navigation" part (atribute) of this object so we type {navigation}
export default function Home({ navigation }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [habits, setHabits] = useState([]);
    const [currentUser,setCurrentUser]= useState("INVALID_USERNAME!");
    const [welcomeText,setWelcomeText] = useState("Loading information...");

    const [initialsDone,setInitials] = useState(false);

    //this thing is called when habits list is changed
    useEffect(() => {
        console.log('useEffect')
        //console.log(habits)
        let item = habits.find((item) => item.created === true);
        // if item is defined then it means that we have added a new habit and we should go to the editing page of this habit
        if (item) {
            setHabits(currentHabits => currentHabits.map(i => ({
                ...i,
                created: undefined
            })));
            navigation.navigate('Details', {pass_item: item, pass_editHabit: editHabit, pass_deleteHabit: deleteHabit,pass_username:currentUser});
            
        }
    }, [habits]);

    const addHabit = () => {
        //console.log('asked to add');
        var newKey = firebase.database().ref("users/"+username+'/habits').push({
            addedBy: username,
            new: true,
            numberOfDays: 0,
            name: '',
            description: '',
            lastDate: 'never'
          }).key;
          firebase.database().ref("users/"+username+'/habits/'+newKey+'/id').set(newKey);
        setHabits((currentHabits) => {
            return [{ name: '', rating: 0, description: '', key: newKey, done: false, created: true}, ...currentHabits] // create a List w/ habit in it and all the decomposed elements from currentHabits
        })
        
    }
    const editHabit = (item) => {
        if(item.name==null || item.name=='')
        {
            deleteHabit(item.key);
            console.log('Habit creation cancelled');
            return;
        }
        firebase.database().ref("users/"+username+'/habits/'+item.key+'/name').set(item.name);
        firebase.database().ref("users/"+username+'/habits/'+item.key+'/description').set(item.description);
        setHabits((currentHabits) => {
            const tmp = currentHabits.filter(habit => habit.key != item.key)
            //console.log('all except one are:')
            //console.log(tmp)
            //console.log('all are:')
            //console.log([item, ...tmp])
            
            return [item, ...tmp]
        })
        console.log('adsfadfdf')
    }
    const deleteHabit = (key) => {
        firebase.database().ref("users/"+username+'/habits/'+key).remove();
        setHabits((currentHabits) => {
            const tmp = currentHabits.filter(habit => habit.key != key)
            return tmp
        })
    }
    const fetchHabits = (snapshot) =>
    {
        var habitsArr = [];
        console.log("Fetching");
        console.log(snapshot);
        for(var id in snapshot.val())
        {
          console.log(id);
          var element = [snapshot.child(id).val()];
          //console.log(element);
          habitsArr.push.apply(habitsArr,element);
        }
        for(var i in habitsArr)
            {
                console.log(habitsArr[i]);
                if(habitsArr[i].new && habitsArr[i].addedBy!=username)
                {
                    Alert.alert(
                        'Someone added you to a habit!',
                        `${habitsArr[i].addedBy} added you to the habit ${habitsArr[i].name}`,
                        [
                          {
                            text: 'Nice!',
                          }
                        ],
                        { cancelable: false }
                      )  
                      firebase.database().ref("users/"+username+'/habits/'+habitsArr[i].id+'/new').set(false);
                }
                setHabits((currentHabits) => {
                    const tmp = currentHabits.filter(habit => habit.key != habitsArr[i].id)
                    return tmp
                })
            setHabits((currentHabits) => {
              return [{ name: habitsArr[i].name, rating: 0, description: habitsArr[i].description, key: habitsArr[i].id, done:habitsArr[i].lastDate==Backend.getDate() , created: false}, ...currentHabits] // create a List w/ habit in it and all the decomposed elements from currentHabits
            
        });
            }
            
        //todo: this makes problems
        //todo: choosing which habits are ticked is here

    }


    const [doneColor, setDoneColor] = useState('#eee');

    const switchDone = (item) => {
        setHabits((currentHabits) => currentHabits.map(i => i.key == item.key ? {
            ...i,
            done: i.done === true ? false : true
        } : i));

        if (item.done == false) {
            setDoneColor(() => { return 'lightgreen'});
            console.log('Habit ticked');
            firebase.database().ref("users/"+username+'/habits/'+item.key+'/numberOfDays').once('value').then(function(snapshot){
                var oldCount = snapshot.val();
                oldCount++;
                firebase.database().ref("users/"+username+'/habits/'+item.key+'/numberOfDays').set(oldCount);
            });
            var dateKey = firebase.database().ref("users/"+username+'/habits/'+item.key+'/dates').push({date:Backend.getDate()}).key;
            firebase.database().ref("users/"+username+'/habits/'+item.key+'/lastDate').once('value').then(function(snapshot){
                var old = snapshot.val();
                firebase.database().ref("users/"+username+'/habits/'+item.key+'/secondLastDate').set(old);
                firebase.database().ref("users/"+username+'/habits/'+item.key+'/lastDateKey').set(dateKey);
                firebase.database().ref("users/"+username+'/habits/'+item.key+'/lastDate').set(Backend.getDate());
            });
            firebase.database().ref("users/"+username+'/habits/'+item.key+'/lastDate').set(Backend.getDate());
            
        }
        else {
            console.log("                    habit unticked");
            setDoneColor(() => { return '#eee'});
            firebase.database().ref("users/"+username+'/habits/'+item.key+'/numberOfDays').once('value').then(function(snapshot){
                var oldCount = snapshot.val();
                oldCount--;
                firebase.database().ref("users/"+username+'/habits/'+item.key+'/numberOfDays').set(oldCount);
            });
            firebase.database().ref("users/"+username+'/habits/'+item.key+'/secondLastDate').once('value').then(function(snapshot){
                var old = snapshot.val();
                firebase.database().ref("users/"+username+'/habits/'+item.key+'/lastDate').set(old);
            });
            firebase.database().ref("users/"+username+'/habits/'+item.key+'/lastDateKey').once('value').then(function(snapshot){
                var dateKey = snapshot.val();
                firebase.database().ref("users/"+username+'/habits/'+item.key+'/dates/'+dateKey).remove();
            });
        }
    }

    
    //console.log(username);
    if(Backend.checkLogin())
    {
        console.log("User logged in (home.js)");
    }
    //this will work when I understand async functions 
    //setCurrentUser("test");
    //var topText = 'Loading information...';
    var username;
    if(firebase.auth().currentUser!=null)
    {
        var uid =  firebase.auth().currentUser.uid;
        firebase.database().ref("usernames/"+uid).once('value').then(function(snapshot){
        console.log(uid);
        username = snapshot.child("uid").val();
        setWelcomeText('Welcome home, '+ username + '!');
        setCurrentUser(username);
        console.log("user name retrieved");
        
        firebase.database().ref("users/"+username+'/habits').once('value').then(function(snap){
           if(!initialsDone) {
            setInitials(true); 
            fetchHabits(snap);
            firebase.database().ref("users/"+username+'/habits').on('value', (snapshot) =>{
                fetchHabits(snapshot);
              });
           }
        });
       // fetchHabits(snapshot.child("habits"));
      });
    } //});
    //console.log(username);
    //fetchHabits();
    return (
        <View style={globalStyles.container}>
            <TouchableOpacity ><Text>{welcomeText}</Text></TouchableOpacity>
            {/* <Modal animationType="slide" visible={modalOpen}>
                <View style={styles.modalContent}>
                    <MaterialIcons
                        name='close'
                        size={40}
                        style={{...styles.modalToggle, ...styles.modalClose}}
                        onPress={() => setModalOpen(false)}
                    />
                        <Form addHabit={addHabit}/>
                    <Text>Hello from the modal :)</Text>
                </View>
            </Modal> */}

            <MaterialIcons
                name='add'
                size={40}
                style={styles.modalToggle}
                onPress={() => addHabit()}
            />

            <FlatList
                data={habits}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Details', {pass_item: item, pass_editHabit: editHabit, pass_deleteHabit: deleteHabit})}>
                        <Card>             
                            <MaterialCommunityIcons
                                name={item.done === true ? 'checkbox-marked' : 'checkbox-blank-outline'}
                                size={40}
                                style={{
                                    ...styles.doneIcon,
                                    backgroundColor: item.done === true ? 'lightgreen' : '#eee',
                                    color: item.done === true ? 'green' : '#999'
                                }}
                                onPress={() => switchDone(item)}
                            />
                            <Text style={{
                                ...globalStyles.titleText,
                                color: item.done === true ? '#999' : 'black',
                                textDecorationLine: item.done === true ? 'line-through' : 'none',
                                }}> { item.name }</Text>
                        </Card>
                    </TouchableOpacity>

                )}
            />
            <TouchableOpacity onPress={Backend.logoutUser}><Text>Log out</Text></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    modalToggle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#f2f2f2',
      padding: 10,
      borderRadius: 10,
      alignSelf: 'center',
    },
    modalClose: {
      marginTop: 20,
      marginBottom: 0,
    },
    modalContent: {
      flex: 1,
    },
    doneIcon: {
        padding: 8,
    }
  });