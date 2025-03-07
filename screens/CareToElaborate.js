import { TextInput, View, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import SecondSelection from '../components/SecondSelection';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import Themes from '../assets/Themes';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');




export default function CareToElaborate() {
    const context = useContext(FeelingContext);
    const navigator = useNavigation();
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
            <SecondSelection basic={context.basic} secondary={context.secondary} setSecondary={context.setSecondary}/>
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
                    let secondary = [...context.secondary];
                    if (text) {
                        secondary.push(text);
                        context.setSecondary(secondary);
                    }
                    context.updateCurrentFeelings(context.basic, secondary);
                    let newFeelings = []
                    for (let i = 0; i < context.basic.length; i++) {
                        newFeelings.push(context.basic[i]);
                    }
                    for (let i = 0; i < secondary.length; i++) {
                        newFeelings.push(secondary[i]);
                    }

                    if (context.motion.name === '') {
                        context.updateMovement(context.motion.name, newFeelings, context.date);
                        navigator.navigate('CurrentEmotion');
                    }
                    else if (context.motion.name === 'choosing') {
                            context.updateMovement('', newFeelings, context.date);
                            navigator.navigate('ChooseMotion');
                    }
                    else {
                        context.updateMovement(context.motion.name, newFeelings, context.date);
                        navigator.navigate('DuringMotion', { selectedMovement: context.motion.name});
                    }
            }
            }>
            <Text style = {styles.buttonText}>select</Text>
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
        fontSize: SCREEN_HEIGHT * 0.045,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    subtitle: {
        // fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.03,
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
