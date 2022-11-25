import { TouchableOpacity, Pressable, SafeAreaView, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Emotion from "../components/Emotion";
import React from "react";
import { MotionContext } from "../App";
import { useState } from "react";
import FeelingContext from '../components/FeelingContext';
import { useContext } from 'react';
import Themes from "../assets/Themes";

export default function DuringMotion() {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    let [currentMotion, updateCurrentMotion] = useState([]);
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.motion}>
                current motion: {context.motion.name}
            </Text>
            <Pressable style={styles.emotionBox} onPress = {() => {
                context.setBasic([]);
                navigator.navigate('HowDoYouFeel')}}>
                    <Emotion feelings={context.allFeelings}/>
            </Pressable>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button}>
                        <Text>add note</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => 
                    {
                        //update motion to movement
                        //update motion to motionsData
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
    }
});