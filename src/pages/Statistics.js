import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
  var Total_days = 0;

export default class ReportScreen extends Component<{}> {

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
  }
};

const mapStateToProps = state => {
  return {};
};

//export default connect(mapStateToProps, {})(ReportScreen);