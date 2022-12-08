import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import BasicSelection from '../components/BasicSelection';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import Themes from '../assets/Themes';
import { MaterialIcons } from '@expo/vector-icons'; 
import { basicFeelings } from "../assets/feelings";

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');


export default function HowDoYouFeelAddMotion({ route }) {
    const navigator = useNavigation();
    const { status, name, movement, feelings, date, note, allFeelings, fullNames } = route.params;
    let newBasic = [];
    let displayedName = name;    
    if (status === 'edit') {
        for (let i = 0; i < basicFeelings.length; i++) {
            if (feelings.indexOf(basicFeelings[i]) !== -1) {
                newBasic.push(basicFeelings[i]);
            }
        }
        displayedName = name.substring(0, name.length-2);
    }
    const [basic, setBasic] = useState(newBasic);

    let button = [];
    if (basic.length > 0) {
        button = [
            <TouchableOpacity 
                style = {styles.selectButton} key={basic.length}
                onPress={() => {
                    navigator.navigate('CareToElaborateAddMotion', {status: status, basic: basic, movement: movement, name:name, feelings:feelings, allFeelings:allFeelings, date:date, note:note, fullNames: fullNames});
                }}>
                <Text style = {styles.buttonText}> select</Text>
            </TouchableOpacity>
        ]
    }

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.backArrowBox}>
            <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => {
                if (status === 'add') {
                    navigator.navigate('MovementOverview', {date:movement.dateEntry})
                }
                else {
                    navigator.navigate('ExerciseOverview', {date:movement.dateEntry, feelings:allFeelings, date:date, note:note, name:name.substring(0, name.length-2), fullNames:fullNames})
                }
            
            }}/>
        </View>
        <Text style={styles.title}> How did you feel during {displayedName}? </Text>
        <Text style={styles.subtitle}> (select all that apply) </Text>
        <View style={styles.selector}>
            <BasicSelection basic={basic} setBasic={setBasic}/>
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
        fontSize: SCREEN_HEIGHT * 0.0375,
        textAlign: 'center',
        fontFamily: 'Avenir',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: SCREEN_HEIGHT * 0.03,
        fontFamily: 'Avenir',
        textAlign: 'center',
        paddingTop: '1%',
        paddingBottom: '4%'
    },
    // take out
    buttonText: {
        fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.03,
    },  
    selectButton: {
        alignItems: 'center',
        justifyContent: 'center',
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
    
    
})