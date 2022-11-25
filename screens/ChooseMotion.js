import { ImageBackground, StyleSheet, Text, Button, Image, View, SafeAreaView, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import BasicSelection from '../components/BasicSelection';
import { useState } from 'react';
import { TabRouter, useNavigation } from '@react-navigation/native';
import Emotion from '../components/Emotion';
import SuggestedMotions from '../components/SuggestedMotions';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';

export default function ChooseMotion({ route }) {
    const context = useContext(FeelingContext);
    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.emotionBox}>
            <Emotion feelings={context.allFeelings}/>
        </View>
        <Text>Suggested:</Text>
        <View style={styles.suggestedBox}>
            <SuggestedMotions currentFeelings={context.allFeelings}/>
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
        justifyContent: 'flex-end'
    },
    emotionBox: {
        height: 200,
        width: 200,
    },
    suggestedBox: {
        height: '62%',
        width: '100%'
    }
});