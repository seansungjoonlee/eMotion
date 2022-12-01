import { TextInput, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Pressable} from 'react-native';
import Emotion from '../components/Emotion';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';
import HowDoYouFeel from './HowDoYouFeel';
import Themes from '../assets/Themes';
import movementData from '../utils/movementData';
import Movement from '../components/Movement';

export default function CurrentEmotion() {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    console.log(movementData[0].motionEntry)
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}> Today's Movement </Text>
            <Pressable style={styles.movementBox} onPress = {() => {
                navigator.navigate('HowDoYouFeel')}}>
                <Movement movementFeelings={context.movementFeelings(movementData[0])} currentFeelings={context.currentFeelings}/>
            </Pressable>

                <TouchableOpacity style = {styles.newMovement} onPress={() => {
                    context.updateMotion('choosing', [])
                    navigator.navigate('ChooseMotion')}
                }>
                    <Text style = {styles.buttonText}> new motion</Text>
                </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Themes.background
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 50
    },
    buttonText: {
        fontSize: 20
    },  
    newMovement: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Themes.background,
        borderWidth: 1,
        marginTop: 30,
        marginBottom: 20,
        width: 200,
        height: 40,
        borderRadius: 1000
     },
     movementBox: {
        marginTop: 30,
        height: 350,
        width: 350,
     },
     emotionBox: {
        marginTop: 10,
        height: 120,
        width: 120,
        marginLeft: 200,
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
     },
     bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
     },
     eMotionText: {
        position: 'absolute',
        fontSize: 16,
        top: -15
     }
});