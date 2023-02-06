import { ImageBackground, StyleSheet, Text, Button, Image, View, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import BasicSelection from '../components/BasicSelection';
import { useNavigation } from '@react-navigation/native';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';
import Themes from '../assets/Themes';
import { MaterialIcons } from '@expo/vector-icons'; 


const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');


export default function HowDoYouFeel() {
    const context = useContext(FeelingContext);
    const navigator = useNavigation();


    let button = [];
    if (context.basic.length > 0) {
        button = [
            <TouchableOpacity 
                style = {styles.selectButton} key={context.basic.length}
                onPress={() => {
                    context.updateSecondary(context.basic);
                    navigator.navigate('CareToElaborate');
                }}>
                <Text style = {styles.buttonText}> select</Text>
            </TouchableOpacity>
        ]
    }

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.backArrowBox}>
            <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => {
                if (context.getCurrentMovementIndex() === -1) {
                    navigator.navigate('Start');
                }
                else if (context.motion.name === '') {
                    navigator.navigate('CurrentEmotion');
                }
                else if (context.motion.name === 'choosing') {
                        navigator.navigate('ChooseMotion');
                }
                else {
                    navigator.navigate('DuringMotion');
                }
            }}/>
        </View>
        <Text style={styles.title}> How do you feel? </Text>
        <Text style={styles.subtitle}> (select all that apply) </Text>
        <View style={styles.selector}>
            <BasicSelection basic={context.basic} setBasic={context.setBasic}/>
        </View>
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
        fontSize: SCREEN_HEIGHT * 0.045,
        textAlign: 'center',
        // fontFamily: 'Avenir',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: SCREEN_HEIGHT * 0.03,
        // fontFamily: 'Avenir',
        textAlign: 'center',
        paddingTop: '1%',
        paddingBottom: '7%'
    },
    // take out
    buttonText: {
        // fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.03,
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
     backArrowBox: {
        width: '100%',
        justifyContent: 'center',
        height: '7.5%',
        paddingHorizontal: '4%',
    },
    selector: {
        height: '50%',
    },
});