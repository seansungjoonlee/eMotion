import { TextInput, View, StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import Emotion from '../components/Emotion';
import SecondSelection from '../components/SecondSelection';
import BasicSelection from '../components/BasicSelection';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';

export default function CareToElaborate() {
    const context = useContext(FeelingContext);
    const navigator = useNavigation();
    const [secondary, setSecondary] = useState([]);
    return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}> Care to elaborate? </Text>
        <Text style={styles.subtitle}> (select all that apply) </Text>
        {/* replace with emotion component */}
        <View style={styles.selector}>
            <SecondSelection basic={context.currentFeelings.basic} secondary={secondary} setSecondary={setSecondary}/>
        </View>

        <TextInput
            style={styles.other}
        //  onChangeText={onChangeNumber}
        //  value={number}
            placeholder="Other"
        />

        <TouchableOpacity style = {styles.selectButton}    
            onPress={() => {
                    context.updateCurrentFeelings(secondary);
                    context.updateAllFeelings(context.currentFeelings.total);
                    if (context.motion.name === '') {
                        navigator.navigate('CurrentEmotion');
                    }
                    else {
                        context.updateMotion(context.motion.name, context.currentFeelings.total);
                        navigator.navigate('DuringMotion');
                    }
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