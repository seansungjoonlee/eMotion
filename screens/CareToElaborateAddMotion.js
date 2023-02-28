import { TextInput, View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import SecondSelection from '../components/SecondSelection';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import Themes from '../assets/Themes';
import { basicFeelings, basicToSecondary } from "../assets/feelings";

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');


export default function CareToElaborateAddMotion({ route }) {
    const { basic, movement, name, feelings, date, note, status, allFeelings, fullNames } = route.params;
    const context = useContext(FeelingContext);
    let newSecondary = [];
    if (status === 'edit') {
        for (let i = 0; i < basicFeelings.length; i++) {
            for (let j = 0; j < basicToSecondary[basicFeelings[i]].length; j++) {
                if (feelings.indexOf(basicToSecondary[basicFeelings[i]][j]) !== -1) {
                    newSecondary.push(basicToSecondary[basicFeelings[i]][j]);
                }
            }
        }
    }
    const navigator = useNavigation();
    const [text, onChangeText] = useState();
    const [secondary, setSecondary] = useState(newSecondary);
    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.backArrowBox}>
            <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => {
                if (status === 'add') {
                    navigator.navigate('HowDoYouFeelAddMotion', {status: status, name: name, movement:movement})
                } else {
                    navigator.navigate('HowDoYouFeelAddMotion', {status: status, name: name, movement:movement, feelings: feelings, allFeelings: allFeelings, date: date, note: note, fullNames: fullNames})
                }
            }}/>
        </View>
        <Text style={styles.title}> Care to elaborate? </Text>
        <Text style={styles.subtitle}> (select all that apply) </Text>
        {/* replace with emotion component */}
        <View style={styles.selector}>
            <SecondSelection basic={basic} secondary={secondary} setSecondary={setSecondary}/>
        </View>
        <View style={styles.textBox}>
            <TextInput
                style={styles.buttonText}
                onChangeText={onChangeText}
                placeholder="other:"
            />
        </View>

        <TouchableOpacity style = {styles.selectButton}    
            onPress={() => {
                if (text) {
                    let updated = [...secondary];
                    updated.push(text);
                    secondary.push(text);
                    setSecondary(updated);
                }
                let newFeelings = [];
                for (let i = 0; i < basic.length; i++) {
                    newFeelings.push(basic[i]);
                } 
                for (let i = 0; i < secondary.length; i++) {
                    newFeelings.push(secondary[i]);
                }

                if (status === 'add') {
                    context.updateMovement(name, newFeelings, movement.dateEntry);
                    navigator.navigate('MovementOverview', {date:movement.dateEntry});
                } else {
                    context.editMotionFromReflection(date, name, newFeelings);
                    navigator.navigate('ExerciseOverview', {date:movement.dateEntry, feelings:allFeelings, date:date, note:note, name:name.substring(0, name.length-2), fullNames: fullNames});
                }
            }
            }>
            <Text style = {styles.buttonText}> select</Text>
        </TouchableOpacity>
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
    backArrowBox: {
        width: '100%',
        justifyContent: 'center',
        height: '7.5%',
        paddingHorizontal: '4%',
    },
    title: {
        // fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.0375,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    subtitle: {
        // fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.03,
        textAlign: 'center',
        paddingTop: '1%',
        paddingBottom: '12.6%'
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
        marginTop: '5%',
        width: '45%',
        height: '8%',
        borderRadius: 1000,
        borderWidth: 1
     },
     selector: {
        height: '50%',
     },
     textBox: {
        height: '7%',
        width: '70%',
        borderWidth: 1,
        borderRadius: 1000,
        justifyContent: 'center',
        paddingLeft: 10,
        marginTop: '5%'
     }
});
