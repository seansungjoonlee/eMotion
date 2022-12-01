import { TextInput, TouchableOpacity, Modal, Pressable, SafeAreaView, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Emotion from "../components/Emotion";
import React from "react";
import { MotionContext } from "../App";
import { useState } from "react";
import FeelingContext from '../components/FeelingContext';
import { useContext } from 'react';
import Themes from "../assets/Themes";
import { Feather } from '@expo/vector-icons'; 

export default function DuringMotion() {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  
    let [currentMotion, updateCurrentMotion] = useState([]);
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
                                fontSize={30}
                            />
                        </View>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Save Note</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Text style={styles.motion}>
                current motion: {context.motion.name}
            </Text>
            <Pressable style={styles.emotionBox} onPress = {() => {
                navigator.navigate('HowDoYouFeel')}}>
                    <Emotion feelings={context.currentFeelings}/>
            </Pressable>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={() =>
                {
                    setModalVisible(!modalVisible)
                }}>
                        <Text>add note</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => 
                    {
                        context.updateMotion('', []);

                        navigator.navigate('CurrentEmotion')
                    }}>
                    <Text>end motion</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
            </View>
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
    motion: {
        fontSize: 20,
        marginTop: 30
    },
    emotionBox: {
        width: 300,
        height: 300,
        marginTop: 40
    },
    buttonRow: {
        height: '10%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 30
    },
    button: {
        height: 50,
        width: 150,
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
        marginBottom: 10
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '7%',
        width: '100%',
        paddingHorizontal: 30
    }
});
