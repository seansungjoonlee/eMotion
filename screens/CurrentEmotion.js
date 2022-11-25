import { TextInput, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Pressable} from 'react-native';
import Emotion from '../components/Emotion';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';

export default function CurrentEmotion() {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}> Current eMotion </Text>
            <Pressable style={styles.emotionBox} onPress = {() => {
                context.setBasic([]);
                context.setSecondary([]);
                navigator.navigate('HowDoYouFeel')}}>
                <Emotion feelings={context.allFeelings}/>
            </Pressable>

            <TouchableOpacity style = {styles.selectButton} onPress={() => navigator.navigate('ChooseMotion')}>
                <Text style = {styles.buttonText}> New Movement</Text>
            </TouchableOpacity>
            <View style={styles.menu}>
                <Image source={require('../assets/profile.png')}></Image>
                <Image source={require('../assets/shared.png')}></Image>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 50
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 50
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        width: 300,
        height: 300,
        borderRadius: 300 / 2,
     },
    // take out
    buttonText: {
        fontSize: 20
    },  
    selectButton: {
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        padding: 10,
        margin: 100,
        witdh: 100,
        height: 70,
        borderRadius: 10
     },
     menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%'
     },
     emotionBox: {
        marginTop: 30,
        height: 200,
        width: 200,
     }
});