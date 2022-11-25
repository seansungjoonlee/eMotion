import { Pressable, SafeAreaView, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Emotion from "../components/Emotion";
import React from "react";
import { MotionContext } from "../App";
import { useState } from "react";
import FeelingContext from '../components/FeelingContext';
import { useContext } from 'react';

export default function DuringMotion() {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    let [currentMotion, updateCurrentMotion] = useState([]);
    return (
        <SafeAreaView style={styles.container}>
            <Text>
                motion: {context.motion.name}
            </Text>
            <Pressable style={styles.emotionBox} onPress = {() => {
                context.newEmotion();
                context.setBasic([]);
                navigator.navigate('HowDoYouFeel')}}>
                    <Emotion feelings={context.allFeelings}/>
            </Pressable>
            <Pressable style={styles.endButton} onPress={() => 
                {
                    console.log(context.motion)
                    //update motion to movement
                    //update motion to motionsData
                    context.updateMotion('', []);
                    navigator.navigate('CurrentEmotion')
                }}>
                <Text>end motion</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    emotionBox: {
        width: 200,
        height: 200,
    },
    endButton: {
        height: 50,
        width: 200,
        marginTop: 40,
        backgroundColor: 'lightgrey',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});