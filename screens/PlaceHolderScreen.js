import { ImageBackground, StyleSheet, Text, Button, Image, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import BasicSelection from '../components/BasicSelection';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Emotion from '../components/Emotion';

export default function PlaceHolderScreen({ route }) {
    const navigator = useNavigation();
    const { basicFeelings, secondaryFeelings } = route.params;
    let feelings = basicFeelings;
    for (let i = 0; i < secondaryFeelings.length; i++){
        feelings.push(secondaryFeelings[i]);
    }

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.emotionBox}>
            <Emotion feelings={feelings}/>
        </View>
    </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    emotionBox: {
        height: 200,
        width: 200,
        borderWidth: 2
    } 
});