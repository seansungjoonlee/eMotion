import { TextInput, ImageBackground, StyleSheet, Text, Button, Image, View, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { useState } from 'react';
import { TabRouter, useNavigation } from '@react-navigation/native';
import Emotion from '../components/Emotion';
import SuggestedMotions from '../components/SuggestedMotions';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';
import Themes from '../assets/Themes';
import { MaterialIcons } from '@expo/vector-icons'; 
import SearchedMotions from '../components/SearchedMotions';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export default function ChooseMotion({ route }) {
    const context = useContext(FeelingContext);
    const navigator = useNavigation();
    const [guided, setGuided] = useState(true);
    const [text, setText] = useState("");

    function guidedOptions() {
        return (
            <View style={styles.optionsBox}>
                <Text style={styles.label}>
                    suggested movements:
                </Text>
                <View style={styles.suggestedBox}>
                    <SuggestedMotions currentFeelings={context.basic}/>
                </View>
            </View>
        )
    };

    function unguidedOptions() {
        return (
            <View style={styles.optionsBox}>
                <Text style={styles.label}>
                    Enter your motion:
                </Text>
                <View style={styles.textBox}>
                    <TextInput
                        style={styles.buttonText}
                        placeholder="search:"
                        onSubmitEditing={(event) => 
                            {
                                setText( event.nativeEvent.text)
                                context.updateMovement(event.nativeEvent.text, context.basic, context.date); //NOT CONSISTENT
                                context.updateMotion(event.nativeEvent.text, context.basic);
                            navigator.navigate('DuringMotion', {selectedMovement: event.nativeEvent.text})}
                        }
                    />
                </View>
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
            <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => {
                context.updateMotion('', []);
                navigator.navigate('CurrentEmotion');
            }}/>
        </View>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>
                current eMotion
            </Text>
        </View>
        <View style={styles.guideSelectBox}>
            <Text style={[styles.guideSelect, {textDecorationLine: guidedUnderline}]} onPress={() => setGuided(true)}>
                guided
            </Text>
            <Text style={[styles.guideSelect, {textDecorationLine: unguidedUnderline}]} onPress={() => setGuided(false)}>
                unguided
            </Text>
        </View>
        <Pressable style={styles.emotionBox} onPress={() => {
            navigator.navigate('HowDoYouFeel');
            }}>
            <Emotion feelings={context.basic}/>
        </Pressable>
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
        width: '100%',
        justifyContent: 'center',
        height: '7.5%',
        paddingHorizontal: '4%',

    },
    guideSelectBox: {
        height: '9%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '14%'
    },
    emotionBox: {
        aspectRatio: 1,
        height: '30%'
    },
    guideSelect: {
        fontSize: SCREEN_HEIGHT * 0.0375,
        // fontFamily: 'Avenir'
    },
    optionsBox: {
        height: '44%',
        width: '100%',
        alignItems: 'center',
    },
    suggestedBox: {
        height: '90%',
        width: '100%',
    },
    label: {
        // fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.03
    },
    textBox: {
        height: '15.5%',
        width: '67%',
        borderWidth: 1,
        borderRadius: 1000,
        justifyContent: 'center',
        paddingLeft: 10,
        marginTop: '4%'
     },
     searchedBox: {
        height: '69%',
        width: '100%',
    },
    title: {
        fontSize: SCREEN_HEIGHT * 0.045,
        // fontFamily: 'Avenir',
        fontWeight: 'bold',
        marginBottom: '3%'
    },
    titleContainer: {
        height: '9%'
    }
});