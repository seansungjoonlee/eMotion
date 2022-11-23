import { ImageBackground, StyleSheet, Text, Button, Image, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import BasicSelection from '../components/BasicSelection';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function HowDoYouFeel() {
    let [currentFeelings, setCurrentFeelings] = useState([]);
    const navigator = useNavigation();

    let button = [];
    if (currentFeelings.length > 0) {
        button = [
            <TouchableOpacity 
                style = {styles.selectButton} key={currentFeelings.length}
                onPress={() => navigator.navigate('CareToElaborate', currentFeelings={currentFeelings})}>
                <Text style = {styles.buttonText}> Select</Text>
            </TouchableOpacity>
        ]
    }

    return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}> How do you feel? </Text>
        <Text style={styles.subtitle}> (select all that apply) </Text>
        {/* replace with emotion component */}
        <BasicSelection currentFeelings={currentFeelings} setCurrentFeelings={setCurrentFeelings}/>
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
        fontSize: 30
    },  
    selectButton: {
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        padding: 20,
        margin: 50,
        witdh: 100,
        height: 70,
        borderRadius: 10
     },   
});