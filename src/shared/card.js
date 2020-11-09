import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        { props.children }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 2,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    //shadowRadius: 6,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    //marginHorizontal: 15,
    //marginVertical: 20,
  },
});