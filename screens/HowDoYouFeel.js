import { ImageBackground, StyleSheet, Text, Button, Image, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import BasicSelection from '../components/BasicSelection';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';
import Themes from '../assets/Themes';

export default function HowDoYouFeel() {
    const context = useContext(FeelingContext);
    const navigator = useNavigation();


    let button = [];
    if (context.basic.length > 0) {
        button = [
            <TouchableOpacity 
                style = {styles.selectButton} key={context.basic.length}
                onPress={() => {
                    context.updateCurrentFeelings(context.basic, []);
                    context.updateSecondary(context.basic);
                    navigator.navigate('CareToElaborate');
                }}>
                <Text style = {styles.buttonText}> select</Text>
            </TouchableOpacity>
        ]
    }

    return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}> How do you feel? </Text>
        <Text style={styles.subtitle}> (select all that apply) </Text>
        {/* replace with emotion component */}
        <BasicSelection basic={context.basic} setBasic={context.setBasic}/>
        {button}
    </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Themes.background
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        paddingTop: '11%'
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'Avenir',
        textAlign: 'center',
        paddingTop: '1%',
        paddingBottom: '7%'
    },
    // take out
    buttonText: {
        fontFamily: 'Avenir',
        fontSize: 20
    },  
    selectButton: {
        alignItems: 'center',
        justifyContent: 'center',
        //padding: 20,
        marginTop: '21%',
        width: '45%',
        height: '8%',
        borderRadius: 1000,
        borderWidth: 1
     },   
});