import { ImageBackground, StyleSheet, Text, Button, Image, View, SafeAreaView, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import BasicSelection from '../components/BasicSelection';
import { useState } from 'react';
import { TabRouter, useNavigation } from '@react-navigation/native';
import Emotion from '../components/Emotion';
import SuggestedMotions from '../components/SuggestedMotions';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';
import Themes from '../assets/Themes';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function ChooseMotion({ route }) {
    const context = useContext(FeelingContext);
    const navigator = useNavigation();
    const [guided, setGuided] = useState(true);

    function guidedOptions() {
        return (
            <View style={styles.optionsBox}>
                <Text style={styles.label}>
                    suggested motions:
                </Text>
                <View style={styles.suggestedBox}>
                    <SuggestedMotions currentFeelings={context.allFeelings}/>
                </View>
            </View>
        )
    };

    function unguidedOptions() {
        return (
            <View style={styles.optionsBox}>
                <Text>Searched:</Text>
            </View>
        )
    };

    let Options = guidedOptions;
    let guidedUnderline = 'underline';
    let unguidedUnderline = 'none';

    if (guided) {
        Options = guidedOptions;
        guidedUnderline = 'underline';
        unguidedUnderline = 'none';
    } else {
        Options = unguidedOptions;
        guidedUnderline= 'none';
        unguidedUnderline = 'underline';
    }

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.backArrowBox}>
            <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => navigator.navigate('CurrentEmotion')}/>
        </View>
        <View style={styles.guideSelectBox}>
            <Text style={[styles.guideSelect, {textDecorationLine: guidedUnderline}]} onPress={() => setGuided(true)}>
                guided
            </Text>
            <Text style={[styles.guideSelect, {textDecorationLine: unguidedUnderline}]} onPress={() => setGuided(false)}>
                unguided
            </Text>
        </View>
        <View style={styles.emotionBox}>
            <Emotion feelings={context.allFeelings}/>
        </View>
        <Options/>
        
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        backgroundColor: Themes.background
    },
    backArrowBox: {
        height: 45,
        width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
    guideSelectBox: {
        height: '8%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 50,
        alignItems: 'center'
    },
    emotionBox: {
        height: 200,
        width: 200,
    },
    guideSelect: {
        fontSize: 25,
    },
    optionsBox: {
        height: '60%',
        width: '100%'
    },
    suggestedBox: {
        height: '79%',
        width: '100%'
    },
    label: {
        fontSize: 20
    }
});