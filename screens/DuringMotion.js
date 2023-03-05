import { Image, TouchableOpacity, Modal, TextInput, Pressable, View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState, useEffect } from "react";
import FeelingContext from '../components/FeelingContext';
import { useContext } from 'react';
import Themes from "../assets/Themes";
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import motionData from "../utils/motionData";
import startMovingComplete from '../assets/icons/start_movement_complete.png'
import startMovingIncomplete from '../assets/icons/start_movement_incomplete.png'
import endMovingComplete from '../assets/icons/end_movement_complete.png'
import endMovingIncomplete from '../assets/icons/end_movement_incomplete.png'
import logMovementComplete from '../assets/icons/log_movement_complete.png'
import logMovementIncomplete from '../assets/icons/log_movement_incomplete.png'
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export default function DuringMotion({route}) {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    const [movementStarted, setMovementStarted] = useState(false)
    const [movement, setMovement] = useState(route.params.selectedMovement)
    const [text, setText] = useState('')
    const [motions, setMotions] = useState([])
    useEffect(() => {
        setMotions(getMotions(motionData));
    }, [])

    const getMotions = (motionData) => {
        var motionList = []
        for (var feeling of Object.keys(motionData)){
            for (var motion of Object.keys(motionData[feeling])){
                if (motionList.indexOf(motion) < 0){
                    motionList.push(motion)
                }
            }
        }
        console.log(motionList)
        return motionList;
    }
    const filterData = (data) => {
        var filteredList = []
        if (text.length == 0){
            return []
        }
        else {
            for (var motion of data){
                if (motion.toLowerCase() == text.toLowerCase()){
                    return []
                }
                if (motion.toLowerCase().includes(text.toLowerCase())){
                    filteredList.push(motion)
                }
            }
            return filteredList
        }
    }
    const renderOptions = filterData(motions).map((motion) => {
        return (
            <TouchableOpacity onPress={() => setText(motion)} style={styles.option}><Text style={{color: 'white'}}>{motion}</Text></TouchableOpacity>
        )
    })
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.movementContainer}>
                {movement.length > 0 && <Text style={styles.motion}>{movement}</Text>}
                {movement.length == 0 && 
                    motions.length > 0 && 
                    <View style={styles.autocompleteContainer}>
                        <View style={{height: 70}}><ScrollView horizontal style={styles.optionView}>{renderOptions}</ScrollView></View>
                        <TextInput style={styles.textinput} onChangeText={setText} value={text} placeholder="Type a movement..." />
                    </View>}
            </View>
            <View style={styles.progressBar}>
                <View style={styles.progressLine}></View>
                <View><Image source={movementStarted ? startMovingComplete : startMovingIncomplete} /></View>
                <View style={[styles.progressLine, {backgroundColor: movementStarted ? 'black' : '#ccc'}]}></View>
                <View><Image source={endMovingIncomplete} /></View>
                <View style={[styles.progressLine, {backgroundColor: '#ccc'}]}></View>
                <View><Image source={logMovementIncomplete} /></View>
            </View>
            {!movementStarted && (movement.length > 0 || text.length > 0) && 
                <View style={styles.bottomViewContainer}>
                    <TouchableOpacity style={styles.startMovingContainer} onPress={() => {
                            setMovementStarted(true)
                            if (text.length > 0) setMovement(text)
                        }}>
                        <Text style={styles.bottomText}>Start Moving</Text>
                    </TouchableOpacity>
                </View>
                }
            {movementStarted && 
            <View style={styles.bottomViewContainer}>
                <TouchableOpacity style={styles.startMovingContainer} onPress={() => 
                    {
                        context.updateMotion(text.length > 0 ? text : movement, []);
                        navigator.navigate('HowDoYouFeel', {movement: text.length > 0 ? text : movement})
                    }}>
                    <Text style={styles.bottomText}>End movement</Text>
                </TouchableOpacity>
            </View>}
            <View style={styles.backArrowBox}>
                <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => {
                navigator.goBack()}}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
    },
    movementContainer:{
        width: '100%',
        height: '75%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 20
    },
    inputText: {
        fontSize: 40,
        fontWeight: '400'
    },
    startMovingContainer: {
        borderRadius: 20,
        borderWidth: 1,
        padding: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        elevation: 20,
        backgroundColor: 'white',
        shadowRadius: 3,
    },
    title: {
        fontSize: SCREEN_HEIGHT * 0.045,
    },
    motion: {
        fontWeight: 'bold',
        fontSize: SCREEN_HEIGHT * 0.045,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Themes.background,
        borderWidth: 1,
        marginTop: '6%',
        width: '65%',
        borderRadius: 1000
     },
     option: {
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 10, 
        margin: 10
     },
    noteButton: {
        height: '100%',
        width: '50%',
        backgroundColor: Themes.background,
        borderRadius: 1000,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textinput: {
        fontSize: 30
    },
    notesSheet: {
        width: '85%',
        height: '80%',
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    centeredView: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    noteBox: {
        height: '80%',
        width: '80%',
        borderWidth: 1,
        marginBottom: '3%'
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '10%',
        width: '100%',
        paddingVertical: '2%',
        paddingHorizontal: '10%',
    },
    bottomText: {
        fontSize: 24,
        fontWeight: '200'
    },
    bottomViewContainer: {
        display: 'flex',
        alignItems: 'center',
        height: '25%',
        marginTop: 10
    },
    autocompleteContainer: {
        flex: 1,
        left: '5%',
        position: 'absolute',
        top: 100,
        zIndex: 1,
      },
    headerContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '18%'
    },
    backArrowBox: {
        width: '100%',
        justifyContent: 'center',
        height: '7.5%',
        paddingHorizontal: '4%',
        position: 'absolute',
        top: 20
    },
    movementInput: {
        fontSize: 30
    },
    progressBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressLine: {
        height: 3,
        width: 70, 
        backgroundColor: 'black',
        margin: 10
    }
});