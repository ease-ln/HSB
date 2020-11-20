import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Modal } from 'react-native';
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Card from '../shared/card'
import { color } from 'react-native-reanimated';

import {Backend} from '../Backend';

// {navigation} as an arg means that when we call Home from navigator we pass some obj 
// and we only need a "navigation" part (atribute) of this object so we type {navigation}
export default function Home({ navigation }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [habits, setHabits] = useState([
        { title: 'Drink water', rating: 5, body: 'drink water int the morinig right after I woke up', key: '1', done: false},
        { title: 'Stretching', rating: 4, body: 'Do streching for 10 minutes in the morning', key: '2', done: false},
        { title: 'Work on FSE project', rating: 3, body: 'work on the front for 45 minutes', key: '3', done: false},
    ]);


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
            navigation.navigate('Details', {pass_item: item, pass_editHabit: editHabit, pass_deleteHabit: deleteHabit});
        }
    }, [habits]);

    const addHabit = () => {
        let newKey = Math.random().toString()
        console.log('asked to add')
        setHabits((currentHabits) => {
            return [{ title: '', rating: 0, body: '', key: newKey, done: false, created: true}, ...currentHabits] // create a List w/ habit in it and all the decomposed elements from currentHabits
        })
        
    }
    const editHabit = (item) => {
        
        setHabits((currentHabits) => {
            const tmp = currentHabits.filter(habit => habit.key != item.key)
            console.log('all except one are:')
            console.log(tmp)
            console.log('all are:')
            console.log([item, ...tmp])

            return [item, ...tmp]
        })
        console.log('adsfadfdf')
    }
    const deleteHabit = (key) => {
        setHabits((currentHabits) => {
            const tmp = currentHabits.filter(habit => habit.key != key)
            return tmp
        })
    }
    const fetchHabits = () =>
    {
        /*habits = Backend.fetchHabits();
        habits.forEach(element => {
            setHabits((currentHabits) => {
                return [{ title: element.name, rating: 0, body: element.description, key: element.id, done: false, created: true}, ...currentHabits] // create a List w/ habit in it and all the decomposed elements from currentHabits
            })
        });*/
        //todo: this makes problems
        //todo: choosing which habits are ticked is here
    }


    const [doneColor, setDoneColor] = useState('#eee');

    const switchDone = (item) => {
        setHabits((currentHabits) => currentHabits.map(i => i.key == item.key ? {
            ...i,
            done: i.done === true ? false : true
        } : i));

        if (item.done == 'true') {
            setDoneColor(() => { return 'lightgreen'});
        }
        else {
            setDoneColor(() => { return '#eee'});
        }
    }

    
    //console.log(username);
    if(Backend.checkLogin())
    {
        console.log("User logged in (home.js)");
    }
    //this will work when I understand async functions 
    var username =  Backend.currentUserID();
    console.log(username);
    fetchHabits();
    return (
        <View style={globalStyles.container}>
            <TouchableOpacity ><Text>Welcome!</Text></TouchableOpacity>
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
                                }}> { item.title }</Text>
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