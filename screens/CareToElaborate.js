import { TextInput, View, StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import Emotion from '../components/Emotion';
import SecondSelection from '../components/SecondSelection';
import BasicSelection from '../components/BasicSelection';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import React from 'react';

export default function CareToElaborate({ route }) {
    let { basic, setBasic } = route.params;
    const [secondary, setSecondary] = useState([]);
    const navigator = useNavigation();
    return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}> Care to elaborate? </Text>
        <Text style={styles.subtitle}> (select all that apply) </Text>
        {/* replace with emotion component */}
        <View style={styles.selector}>
            <SecondSelection basic={basic} secondary={secondary} setSecondary={setSecondary}/>
        </View>

        <TextInput
            style={styles.other}
        //  onChangeText={onChangeNumber}
        //  value={number}
            placeholder="Other"
        />

        <TouchableOpacity style = {styles.selectButton}    
            onPress={() => {
                    let newFeelings = [];
                    for (let i = 0; i < basic.length; i++) {
                        newFeelings.push(basic[i]);
                    }
                    for (let i = 0; i < secondary.length; i++) {
                        newFeelings.push(secondary[i]);
                    }
                    navigator.navigate('CurrentEmotion',{newFeelings:newFeelings, setSecondary: setSecondary, setBasic: setBasic })   
            }
            }>
            <Text style = {styles.buttonText}> Select</Text>
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
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 20
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 8,
        paddingBottom: 20
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
        fontSize: 30
    },  
    selectButton: {
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        padding: 20,
        margin: 20,
        witdh: 100,
        height: 70,
        borderRadius: 10
     },
     other: {
        color: 'black',
        fontSize: 30,
     },
     selector: {
        height: 300,
     },
});