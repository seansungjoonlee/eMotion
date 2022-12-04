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

export default function EditNote({ route }) {
    const context = useContext(FeelingContext);
    const navigator = useNavigation();
    const [guided, setGuided] = useState(true);
    const [text, setText] = useState("");
    console.log(text);

    return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Edit Note</Text>
        <View style={styles.row}>
            <View>
                <Text style={styles.text}>6/8/22</Text>
                <Text style={styles.text}>Squat</Text>
            </View>
            <View style={styles.circle}>
                <Text>insert eMotion</Text>
            </View>
        </View>

        <View style={styles.note}>
            <Text>Notes</Text>
        </View>

        <View style={styles.buttonView}>
            <TouchableOpacity style = {styles.selectButton}    
                onPress={() => {
                        if (text) {
                            secondary.push(text);
                        }
                        let newFeelings = []
                        for (let i = 0; i < context.basic.length; i++) {
                            newFeelings.push(context.basic[i]);
                        }
                        for (let i = 0; i < secondary.length; i++) {
                            newFeelings.push(secondary[i]);
                        }
                        context.setCurrentFeelings(newFeelings);
                        context.updateAllFeelings(newFeelings);
                        console.log(context.motion);
                        if (context.motion.name === '') {
                            navigator.navigate('CurrentEmotion');
                        }
                        else if (context.motion.name === 'choosing') {
                                navigator.navigate('ChooseMotion');
                        }
                        else {
                            context.updateMotion(context.motion.name, context.currentFeelings);
                            navigator.navigate('DuringMotion');
                        }
                }
                }>
                <Text style = {styles.buttonText}> save</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.selectButton}    
                onPress={() => {
                        if (text) {
                            secondary.push(text);
                        }
                        let newFeelings = []
                        for (let i = 0; i < context.basic.length; i++) {
                            newFeelings.push(context.basic[i]);
                        }
                        for (let i = 0; i < secondary.length; i++) {
                            newFeelings.push(secondary[i]);
                        }
                        context.setCurrentFeelings(newFeelings);
                        context.updateAllFeelings(newFeelings);
                        console.log(context.motion);
                        if (context.motion.name === '') {
                            navigator.navigate('CurrentEmotion');
                        }
                        else if (context.motion.name === 'choosing') {
                                navigator.navigate('ChooseMotion');
                        }
                        else {
                            context.updateMotion(context.motion.name, context.currentFeelings);
                            navigator.navigate('DuringMotion');
                        }
                }
                }>
                <Text style = {styles.buttonText}> cancel</Text>
            </TouchableOpacity>
        </View>
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
    buttonText: {
        fontSize: 20,
    },  
    buttonView: {
        flexDirection: 'row'
    },
    suggestedBox: {
        height: '79%',
        width: '100%'
    },
    selectButton: {
        alignItems: 'center',
        justifyContent: 'center',
        //padding: 20,
        marginTop: 25,
        width: 175,
        height: 50,
        borderRadius: 1000,
        borderWidth: 1
     },
    circle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 200,
        borderRadius: 200/2,
        backgroundColor: 'grey'
    },
    row: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },    
    text: {
        fontSize: 40,
        padding: 10
    },
    backArrowBox: {
        height: 45,
        width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
    guideSelectBox: {
        height: '8%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 50,
        alignItems: 'center'
    },
    emotionBox: {
        height: 200,
        width: 200,
    },
    guideSelect: {
        fontSize: 25,
    },
    optionsBox: {
        height: '60%',
        width: '100%',
        alignItems: 'center'
    },
    suggestedBox: {
        height: '79%',
        width: '100%'
    },
    label: {
        fontSize: 20
    },
    textBox: {
        height: 40,
        width: 250,
        borderWidth: 1,
        borderRadius: 100,
        justifyContent: 'center',
        paddingLeft: 10,
        marginTop: 20
     },
     searchedBox: {
        height: '62%',
        width: '100%',
    },
    note: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 400,
        backgroundColor: "grey",
    }
});