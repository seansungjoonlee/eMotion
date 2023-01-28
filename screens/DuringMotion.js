import { TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, Pressable, SafeAreaView, View, Text, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Emotion from "../components/Emotion";
import React from "react";
import { useState, useEffect } from "react";
import FeelingContext from '../components/FeelingContext';
import { useContext } from 'react';
import Themes from "../assets/Themes";
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';


const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export default function DuringMotion() {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    
    const [colors, setColors] = useState([])
    const movement = context.movementData[context.getCurrentMovementIndex()];
    // console.log(`${movement}: movement`)
    // console.log(movement.motionEntry);
    // console.log(movement.dateEntry);
    console.log("feelings: " + context.basic);
    let temp = '';

    const colorList = [
        {offset: '0%', color: '#231557', opacity: '1'},
        {offset: '29%', color: '#44107A', opacity: '1'},
        {offset: '67%', color: '#FF1361', opacity: '1'},
        {offset: '100%', color: '#FFF800', opacity: '1'}
      ]
    useEffect(() => {
        var tempColors = []
        for (var i = 0; i < context.basic.length; i++) {
            tempColors.push(context.colorMapping[context.basic[i]])
        }
        setColors(tempColors)
        console.log(tempColors)
    }, [])
    
    //wtf is this. is this just for notes?
    if (context.motion.name !== '' && context.motion.name !=='choosing') {
        let i = movement.motionEntry.length - 1;
    //     while (movement.motionEntry[i].name.substring(0, movement.motionEntry[i].name.length - 2) === context.motion.name) {
    //         i -= 1
    //     }
    //     i = i + 1;
    //     console.log(movement.motionEntry)
        temp = movement.motionEntry[i].note
    }


  
    const [modalVisible, setModalVisible] = useState(false);
    const [note, setNote] = useState(temp);
    return (
        <SafeAreaView style={styles.container}>
            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.notesSheet}>
                        <View style={styles.topBar}>
                            <Pressable onPress={() => {
                            setModalVisible(!modalVisible);
                            }}>
                                <Feather name="x" size={36} color="black"/> */}
                                <LinearGradient style={{height: '100%', width: '100%'}} colors={colors}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.notesSheet}>
                            <View style={styles.topBar}>
                                <Pressable onPress={() => {
                                setModalVisible(!modalVisible);
                                }}>
                                    <Feather name="x" size={36} color="black"/>
                                </Pressable>
                                <Pressable
                            style={[styles.noteButton, styles.buttonClose]}
                            onPress={() => {
                                context.editNote('motion', context.date, context.motion.name, note);
                                setModalVisible(!modalVisible);
                            }}
                            >
                                <Text style={styles.buttonText}>save note</Text>
                            </Pressable>
                            {/* <Pressable
                        style={[styles.noteButton, styles.buttonClose]}
                        onPress={() => {
                            context.editNote('motion', context.date, context.motion.name, note);
                            setModalVisible(!modalVisible);
                        }}
                        >
                            <Text style={styles.buttonText}>save note</Text>
                        </Pressable>
                        </View>
                        <View style={styles.noteBox}>
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                defaultValue={note}
                                onChangeText={note => setNote(note)}
                                style={{padding: 10}}
                                fontSize={SCREEN_HEIGHT * 0.045}
                            /> */}
                             </View>
                            <View style={styles.noteBox}>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    defaultValue={note}
                                    onChangeText={note => setNote(note)}
                                    style={{padding: 10}}
                                    fontSize={SCREEN_HEIGHT * 0.045}
                                />
                            </View>
                        </View>
                    </View>
                {/* </View> */}
            </Modal>

            {/* <View style={styles.backArrowBox}>
                <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => {
                context.updateMotion('choosing', [])
                navigator.navigate('ChooseMotion')}}/>
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>
                    current movement:
                </Text>
                <Text style={styles.motion}>
                    {context.motion.name}
                </Text>
            </View>
            <Pressable style={styles.emotionBox} onPress = {() => {
                navigator.navigate('HowDoYouFeel')}}>
                    <Emotion feelings={context.currentFeelings}/>
            </Pressable>
                <TouchableOpacity style={styles.button} onPress={() =>
                {
                    setModalVisible(!modalVisible)
                }}>
                        <Text style={styles.buttonText}>add note</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() =>  */}
                <View style={styles.backArrowBox}>
                    <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => {
                    context.updateMotion('choosing', [])
                    navigator.navigate('ChooseMotion')}}/>
                </View>
                <View style={styles.headerContainer}>
                    <Text style={styles.motion}>
                        {context.motion.name}
                    </Text>
                </View>
                    <TouchableOpacity style={styles.button} onPress={() =>
                    {
                        // context.updateMotion('', []);
                        // navigator.navigate('CurrentEmotion')
                        setModalVisible(!modalVisible)

                    }}>
                    {/* <Text style={styles.buttonText}>end movement</Text>
                </TouchableOpacity> */}
                 <Text style={styles.buttonText}>add note</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => 
                        {
                            context.updateMotion('', []);
                            navigator.navigate('CurrentEmotion')
                        }}>
                        <Text style={styles.buttonText}>end movement</Text>
                    </TouchableOpacity>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute'
    },
    container:{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Themes.background
    },
    title: {
        fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.045,
    },
    motion: {
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: SCREEN_HEIGHT * 0.045,
    },
    emotionBox: {
        aspectRatio: 1,
        height: '30%',
        marginBottom: '8%'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Themes.background,
        borderWidth: 1,
        marginTop: '6%',
        width: '65%',
        height: '8%',
        borderRadius: 1000
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
    buttonText: {
        fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.03

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
    },
});