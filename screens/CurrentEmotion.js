import { TextInput, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Pressable} from 'react-native';
import Emotion from '../components/Emotion';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';
import HowDoYouFeel from './HowDoYouFeel';
import Themes from '../assets/Themes';

export default function CurrentEmotion() {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}> Current eMotion </Text>
            <Pressable style={styles.emotionBox} onPress = {() => {
                context.setBasic([]);
                navigator.navigate('HowDoYouFeel')}}>
                <Emotion feelings={context.allFeelings}/>
            </Pressable>

            <TouchableOpacity style = {styles.newMovement} onPress={() => navigator.navigate('ChooseMotion')}>
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
        marginTop: 50,
        marginBottom: 20,
        width: 200,
        height: 40,
        borderRadius: 1000
     },
     emotionBox: {
        marginTop: 30,
        height: 300,
        width: 300,
     }
});