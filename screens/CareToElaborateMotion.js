import { TextInput, View, StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import Emotion from '../components/Emotion';
import SecondSelection from '../components/SecondSelection';
import BasicSelection from '../components/BasicSelection';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import React from 'react';

export default function CareToElaborateMotion({ route }) {
    let { basic, setBasic, motion, allFeelings } = route.params;
    const [secondary, setSecondary] = useState([]);
    const navigator = useNavigation();
    console.log(allFeelings);
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
                    for (let i = 0; i < basic.length; i++) {
                        if (allFeelings.indexOf(basic[i]) === -1) {
                            allFeelings.push(basic[i]);
                        }
                    }
                    for (let i = 0; i < secondary.length; i++) {
                        if (allFeelings.indexOf(secondary[i]) === -1) {
                            allFeelings.push(secondary[i]);
                        }
                    }
                    console.log(allFeelings);
                    navigator.navigate('DuringMotion',{name:motion, allFeelings:allFeelings, setBasic:setBasic, setSecondary:setSecondary })   
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