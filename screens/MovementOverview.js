import { TextInput, ImageBackground, StyleSheet, Text, Button, Image, View, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';
import Themes from '../assets/Themes';
import { MaterialIcons } from '@expo/vector-icons'; 
import Movement from '../components/Movement';
import ReflectedMotions from '../components/ReflectedMotions';
import Emotion from '../components/Emotion';
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export default function MovementOverview({ route }) {
    const context = useContext(FeelingContext);
    const navigator = useNavigation();
    const [guided, setGuided] = useState(true);
    const [text, setText] = useState("");
    const { date, feelings } = route.params;
    console.log(route.params.feelings)
    const [uniqueFeelings, setUniqueFeelings] = useState([])
    const movement = context.getMovement(date);
    let displayedContent = [];
    useEffect(() => {
        var temp = []
        for (var feeling of feelings){
            if (temp.indexOf(feeling) < 0){
                temp.push(feeling)
            }
        }
        setUniqueFeelings(temp)
    }, [])
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
                    <Emotion feelings={feelings} noPulse={true}/>
                </Pressable>
                <View style={styles.feelingsText}>
                <Text>You were feeling </Text>
                    {uniqueFeelings.map((feeling) => {
                        return (
                            <Text>{feeling},  </Text>
                        )
                    })}
                </View>
                <View style={styles.motionsList}>
                    <ReflectedMotions movement={movement}/>
                </View>
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
    feelingsText:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 20
    },
    date: {
        // fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.045,
    },
    backArrowBox: {
        width: '100%',
        justifyContent: 'center',
        height: '7.5%',
        paddingHorizontal: '4%',
    },
    textButton: {
        // fontFamily: 'Avenir',
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