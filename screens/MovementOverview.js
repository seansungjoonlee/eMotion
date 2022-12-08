import { TextInput, ImageBackground, StyleSheet, Text, Button, Image, View, SafeAreaView, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';
import Themes from '../assets/Themes';
import { MaterialIcons } from '@expo/vector-icons'; 
import Movement from '../components/Movement';
import ReflectedMotions from '../components/ReflectedMotions';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export default function MovementOverview({ route }) {
    const context = useContext(FeelingContext);
    const navigator = useNavigation();
    const [guided, setGuided] = useState(true);
    const [text, setText] = useState("");
    const { date } = route.params;
    const movement = context.getMovement(date);
    let displayedContent = [];

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
                <TouchableOpacity style={styles.button} onPress={() => navigator.navigate('AddingMotion', {movement: movement})}>
                    <Text style={styles.textButton}>
                        add movement
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
        height: '25%',
        aspectRatio: 1,
        margin: '4%'
    },      
    date: {
        fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.045,
    },
    backArrowBox: {
        width: '100%',
        justifyContent: 'center',
        height: '7.5%',
        paddingHorizontal: '4%',
    },
    textButton: {
        fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.03
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Themes.background,
        borderWidth: 1,
        marginTop: '5%',
        width: '65%',
        height: '8%',
        borderRadius: 1000
     },
});