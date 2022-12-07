import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Themes from '../assets/Themes';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Emotion from '../components/Emotion';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 




export default function ColorMenu() {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.backArrowBox}>
                <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => navigator.navigate('CalendarScreen')}/>
            </View>
            <View style={styles.section}>
                <Text style={styles.feelingName}>
                    joyful: 
                </Text>
                <Pressable style={styles.orbBox} onPress={() => navigator.navigate('ColorSelection', {feeling: 'joyful'})}>
                    <Emotion feelings={['joyful']}/>
                </Pressable>
            </View>
            <View style={styles.section}>
                <Text style={styles.feelingName}>
                    anxious: 
                </Text>
                <Pressable style={styles.orbBox} onPress={() => navigator.navigate('ColorSelection', {feeling: 'anxious'})}>
                    <Emotion feelings={['anxious']}/>
                </Pressable>
            </View>
            <View style={styles.section}>
                <Text style={styles.feelingName}>
                    angry: 
                </Text>
                <Pressable style={styles.orbBox} onPress={() => navigator.navigate('ColorSelection', {feeling: 'angry'})}>
                    <Emotion feelings={['angry']}/>
                </Pressable>
            </View>
            <View style={styles.section}>
                <Text style={styles.feelingName}>
                    sad: 
                </Text>
                <Pressable style={styles.orbBox} onPress={() => navigator.navigate('ColorSelection', {feeling: 'sad'})}>
                    <Emotion feelings={['sad']}/>
                </Pressable>
            </View>
            <View style={styles.section}>
                <Text style={styles.feelingName}>
                    surprised: 
                </Text>
                <Pressable style={styles.orbBox} onPress={() => navigator.navigate('ColorSelection', {feeling: 'surprised'})}>
                    <Emotion feelings={['surprised']}/>
                </Pressable>
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
    section: {
        height: '15%',
        margin: '2%',
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    backArrowBox: {
        height: 45,
        width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'center',
    },
    orbBox: {
        height: 80,
        width: 80,
    },
    feelingName: {
        fontFamily: 'Avenir',
        fontSize: 25
    }
});