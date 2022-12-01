import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Themes from '../assets/Themes';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Emotion from '../components/Emotion';
import movementData from '../utils/movementData';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';


function changeDateFormat(inputDate){  // expects Y-m-d
    var splitDate = inputDate.split('-');
    if(splitDate.count == 0){
        return null;
    }

    var year = splitDate[0];
    var month = splitDate[1];
    var day = splitDate[2]; 

    return day + '/' + month + '/' + year;
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
                    return (
                    <View style={styles.date}>
                        <Emotion feelings = {context.getFeelingsDate(newDate)}/>
                        <Text style={styles.dayText}>{date.day}</Text>
                    </View>
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
        justifyContent: 'flex-start',
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