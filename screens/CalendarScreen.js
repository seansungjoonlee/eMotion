import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from '@react-navigation/native';
import Themes from '../assets/Themes';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';
import Emotion from '../components/Emotion';
import { Ionicons } from '@expo/vector-icons'; 
import hardcodedMovementData from '../utils/movementData';



const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');



function changeDateFormat(inputDate){  // expects Y-m-d
    var splitDate = inputDate.split('-');
    if(splitDate.count == 0){
        return null;
    }

    var year = splitDate[0];
    var month = splitDate[1];
    var day = splitDate[2]; 
    if (day[0] === '0') {
        day = day[1];
    }

    return month + '/' + day + '/' + year;
}


function getTime() {
    let newDate = new Date();
    let time = newDate.getHours();
    if(newDate.getMinutes() < 10) {
      time += ':0' + newDate.getMinutes();
    } else {
      time += ':' + newDate.getMinutes();
    }
    return time;
  }

  

export default function CalendarScreen() {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    console.log("latest entry: " + hardcodedMovementData[hardcodedMovementData.length-1].dateEntry);
    
    function getMovement(date) {
        for (let i = 0; i < hardcodedMovementData.length; i++) {
          if (hardcodedMovementData[i].dateEntry === date) {
            return hardcodedMovementData[i];
          }
        }
        return -1;
      }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
            </View>
            <Text style={styles.title}>
                reflect
            </Text>
            <View style={styles.calendarContainer}>
                <Calendar
                    style={[styles.calendar]}

                    dayComponent={({date, _}) => {
                        const newDate = changeDateFormat(date.dateString);
                        let movementFeelings = [];
                        console.log("newdate: " + getMovement(newDate));
                        if (getMovement(newDate) !== -1) {
                            var nestedFeelings = context.movementFeelings(getMovement(newDate));
                            var temp = []
                            for (var i = nestedFeelings.length-1; i >= 0; i--){
                                for (var k = nestedFeelings[i].length-1; k >= 0; k--){
                                    temp.push(nestedFeelings[i][k])
                                }
                            }
                            movementFeelings = temp
                        }
                        return (
                        <Pressable style={styles.date} onPress={() => navigator.navigate("MovementOverview", {date: newDate, feelings: movementFeelings})}>
                            {movementFeelings.length > 0 &&
                            <Emotion feelings={movementFeelings} noPulse={true}/>}
                            <Text style={styles.dayText}>{date.day}</Text>
                        </Pressable>
                        );
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: Themes.background,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: '7.5%',
        paddingHorizontal: '7%',
        width: '100%'
    },
    title: {
        fontSize: SCREEN_HEIGHT * 0.045,
        // fontFamily: 'Avenir',
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: '5%'
    },
    date: {
        width: '100%',
        aspectRatio: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dayText: {
        position: 'absolute'
    },
    calendar: {
        height: '100%',
        width: '100%',
    },
    calendarContainer: {
        width: '90%',
        height: '70%'
    }
});
