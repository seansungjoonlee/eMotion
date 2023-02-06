import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from '@react-navigation/native';
import Themes from '../assets/Themes';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';
import Movement from '../components/Movement';
import { Ionicons } from '@expo/vector-icons'; 

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
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Ionicons name="settings-sharp" size={35} color="black" onPress={() => {
                    navigator.navigate('ColorMenu');
                    console.log("TRACK: opened settings: " + getTime());
                }}/>
            </View>
            <Text style={styles.title}>
                reflect
            </Text>
            <View style={styles.calendarContainer}>
                <Calendar
                    style={[styles.calendar]}
                    dayComponent={({date, state}) => {
                        const newDate = changeDateFormat(date.dateString);
                        let movementFeelings = [];
                        if (context.getMovement(newDate) !== -1) {
                            movementFeelings = context.movementFeelings(context.getMovement(newDate));
                        }
                        return (
                        <Pressable style={styles.date} onPress={() => navigator.navigate("MovementOverview", {date: newDate})}>
                            <Movement movementFeelings={movementFeelings}/>
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