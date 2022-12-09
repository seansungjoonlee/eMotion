import { TextInput, TouchableOpacity, Modal, Pressable, SafeAreaView, View, Text, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Emotion from "../components/Emotion";
import React from "react";
import { useState } from "react";
import FeelingContext from '../components/FeelingContext';
import { useContext } from 'react';
import Themes from "../assets/Themes";
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 


const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export default function DuringMotion() {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);

  
    const [modalVisible, setModalVisible] = useState(false);
    const [note, setNote] = useState();
    return (
        <SafeAreaView style={styles.container}>
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
                        <Pressable style={styles.topBar} onPress={() => {
                            setModalVisible(!modalVisible);
                        }}>
                            <Feather name="x" size={36} color="black"/>
                        </Pressable>
                        <View style={styles.noteBox}>
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={note => setNote(note)}
                                style={{padding: 10}}
                                fontSize={SCREEN_HEIGHT * 0.045}
                            />
                        </View>
                        <Pressable
                        style={[styles.noteButton, styles.buttonClose]}
                        onPress={() => {
                            context.editNote('motion', context.date, context.motion.name, note);
                            setModalVisible(!modalVisible);
                        }}
                        >
                            <Text style={styles.buttonText}>save note</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <View style={styles.backArrowBox}>
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
                <TouchableOpacity style={styles.button} onPress={() => 
                    {
                        context.updateMotion('', []);
                        navigator.navigate('CurrentEmotion')
                    }}>
                    <Text style={styles.buttonText}>end movement</Text>
                </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
        height: '9%',
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '7%',
        width: '100%',
        paddingHorizontal: '10%'
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
