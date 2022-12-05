import { TextInput, ImageBackground, StyleSheet, Text, Button, Image, View, SafeAreaView, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import BasicSelection from '../components/BasicSelection';
import { useState } from 'react';
import { TabRouter, useNavigation } from '@react-navigation/native';
import Emotion from '../components/Emotion';
import SuggestedMotions from '../components/SuggestedMotions';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';
import Themes from '../assets/Themes';
import { MaterialIcons } from '@expo/vector-icons'; 
import SearchedMotions from '../components/SearchedMotions';
import Movement from '../components/Movement';
import ReflectedMotions from '../components/ReflectedMotions';
import movementData from '../utils/movementData';

export default function MovementOverview({ route }) {
    const context = useContext(FeelingContext);
    const navigator = useNavigation();
    const [guided, setGuided] = useState(true);
    const [text, setText] = useState("");
    const { date } = route.params;
    const movement = context.getMovement(date);
    let displayedContent = [];
    console.log(movement)

    if (movement === -1) {
        displayedContent = (
            <SafeAreaView style={styles.container}>
                <View style={styles.backArrowBox}>
                    <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => navigator.navigate('CalendarScreen')}/>
                </View>
                <Text>
                    No Data for {date}
                </Text>
            </SafeAreaView>
        )
    } else {
        displayedContent = (
            <SafeAreaView style={styles.container}>
                <View style={styles.backArrowBox}>
                    <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => navigator.navigate('CalendarScreen')}/>
                </View>
                <View>
                    <Text style={styles.date}>
                        {date}
                    </Text>
                </View>
                <Pressable style={styles.movementBox}>
                    <Movement movementFeelings={context.movementFeelings(movement)}/>
                </Pressable>
                <View style={styles.motionsList}>
                    <ReflectedMotions movement={movement}/>
                </View>
                <TouchableOpacity style={styles.addMotion} onPress={() => navigator.navigate('AddingMotion', {movement: movement})}>
                    <Text>
                        + add motion
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {displayedContent}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        backgroundColor: Themes.background
    },
    motionsList: {
        height: '41%',
        width: '100%',
    },
    movementBox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
        margin: 15
    },      
    date: {
        fontSize: 40,
    },
    backArrowBox: {
        height: 45,
        width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
    addMotion: {
        height: 50,
        width: 250,
        backgroundColor: Themes.background,
        borderRadius: 1000,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    }
});