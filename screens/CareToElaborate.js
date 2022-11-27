import { TextInput, View, StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import Emotion from '../components/Emotion';
import SecondSelection from '../components/SecondSelection';
import BasicSelection from '../components/BasicSelection';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import Themes from '../assets/Themes';


export default function CareToElaborate() {
    const context = useContext(FeelingContext);
    const navigator = useNavigation();
    const [secondary, setSecondary] = useState([]);
    const [text, onChangeText] = useState();
    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.backArrowBox}>
            <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => navigator.navigate('HowDoYouFeel')}/>
        </View>
        <Text style={styles.title}> Care to elaborate? </Text>
        <Text style={styles.subtitle}> (select all that apply) </Text>
        {/* replace with emotion component */}
        <View style={styles.selector}>
            <SecondSelection basic={context.basic} secondary={secondary} setSecondary={setSecondary}/>
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
                        secondary.push(text);
                    }
                    let newFeelings = []
                    for (let i = 0; i < context.basic.length; i++) {
                        newFeelings.push(context.basic[i]);
                    }
                    for (let i = 0; i < secondary.length; i++) {
                        newFeelings.push(secondary[i]);
                    }
                    context.setCurrentFeelings(newFeelings);
                    context.updateAllFeelings(newFeelings);
                    console.log(context.motion);
                    if (context.motion.name === '') {
                        navigator.navigate('CurrentEmotion');
                    }
                    else if (context.motion.name === 'choosing') {
                            navigator.navigate('ChooseMotion');
                    }
                    else {
                        context.updateMotion(context.motion.name, context.currentFeelings);
                        navigator.navigate('DuringMotion');
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
        height: 45,
        width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 0
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 35
    },
    // take out
    buttonText: {
        fontSize: 20,
    },  
    selectButton: {
        alignItems: 'center',
        justifyContent: 'center',
        //padding: 20,
        marginTop: 25,
        width: 175,
        height: 50,
        borderRadius: 1000,
        borderWidth: 1
     },
     selector: {
        height: 300,
     },
     textBox: {
        height: 40,
        width: 250,
        borderWidth: 1,
        borderRadius: 100,
        justifyContent: 'center',
        paddingLeft: 10,
        marginTop: 20
     }
});