import { TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, Pressable, View, Text, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
import Autocomplete from 'react-native-autocomplete-input';
import motionData from "../utils/motionData";

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export default function DuringMotion({route}) {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    const [colors, setColors] = useState([])
    const [note, setNote] = useState('')
    const [movement, setMovement] = useState(route.params.selectedMovement)
    const [text, setText] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [motions, setMotions] = useState([])
    useEffect(() => {
        const currentEmotions = context.movementFeelings(context.movementData[context.getCurrentMovementIndex()])[0]
        var tempColors = []
        tempColors.push('white')
        for (var i = 0; i <  currentEmotions.length; i++) {
            tempColors.push(context.colorMapping[currentEmotions[i]])
        }
        setColors(tempColors)
        setMotions(getMotions(motionData, context.movementFeelings(context.movementData[context.getCurrentMovementIndex()])[0]));
    }, [])

    const getMotions = (motionData, currentFeelings) => {
        let motions = {};
          for (let i = 0; i < motionData.length; i++) {
            let motion = motionData[i];
            for (let j = 0; j < currentFeelings.length; j++) {
              let pos = motion['feelings'].indexOf(currentFeelings[j]);
              if (pos !== -1){
                if (motion['name'] in motions) {
                  motions[motion['name']].push(currentFeelings[j]);
                }
                else {
                  motions[motion['name']] = [currentFeelings[j]];
                }
              }
            }
          }
        let motionList = [];
        for (const motion in motions) {
          motionList.push({
            name: motion,
            motionFeelings: motions[motion],
          });
        }
        return motionList;
    }
    const filterData = (data) => {
        var filteredList = []
        if (text.length == 0){
            return []
        }
        else {
            for (var motion of data){
                if (motion.name == text){
                    return []
                }
                if (motion.name.includes(text)){
                    filteredList.push(motion.name)
                }
            }
            return filteredList
        }
    }
    const renderItem = (item) => {
        console.log(item)
        return(
            <TouchableOpacity onPress={() => setText(item.item)}>
                <Text style={styles.itemText}>{item.item}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView>
            <LinearGradient style={styles.container} colors={colors}>
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

            </Modal>

                <View style={styles.backArrowBox}>
                    <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => {
                    navigator.goBack()}}/>
                </View>
        {movement.length > 0 && <Text style={styles.motion}>{movement}</Text>}
        {movement.length == 0 && 
            motions.length > 0 && 
            <View style={styles.autocompleteContainer}>
                <Autocomplete
                    data={filterData(motions)}
                    value={text}
                    onChangeText={setText}
                    flatListProps={{
                    keyExtractor: (_, idx) => idx,
                    renderItem: renderItem}}
                    />
            </View>}
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: SCREEN_HEIGHT * 0.045,
    },
    motion: {
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
    listElement: {
        backgroundColor: 'pink',
        fontSize: 20,
        padding: 20,
        color: 'black'
    },
    buttonText: {
        // fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.03

    },
    autocompleteContainer: {
        flex: 1,
        left: '10%',
        position: 'absolute',
        top: 100,
        zIndex: 1,
        backgroundColor: 'white',
        width: '80%'
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
        top: 0
    },
    movementInput: {
        fontSize: 30
    }
});