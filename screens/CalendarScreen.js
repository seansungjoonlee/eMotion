import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Themes from '../assets/Themes';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Emotion from '../components/Emotion';
import movementData from '../utils/movementData';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';
import Movement from '../components/Movement';


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



export default function CalendarScreen() {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    return (
        <SafeAreaView style={styles.container}>
            <Calendar
                style={[styles.calendar, {height: 400}, {width: 300}]}
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
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: Themes.background,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 50
    },
    date: {
        height: 40,
        width: 40,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dayText: {
        position: 'absolute'
    }
});