import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from './components/header';
import HabitItem from "./components/HabitItem";
import AddHabit from "./components/AddHabit";

export default function App() {
  const [habits, setHabits] = useState([
    { text: 'brush teeth', key: '1' },
    { text: 'do a workout', key: '2' },
    { text: 'work on the FSE app', key: '3' },
  ]);

  const pressHandler = (key) => {
    setHabits((prevHabits) => {
      return prevHabits.filter(todo => todo.key != key)
    })
  }
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <AddHabit />
        <View style={styles.list}>
          <FlatList
              data={habits}
              renderItem={ ({ item }) => (
                  <HabitItem item={item} pressHandler = {pressHandler} />
              ) }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  content: {
    padding: 40,
    paddingTop: 20,
  },
  list: {
    marginTop: 20,
}
});
