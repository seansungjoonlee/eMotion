import { StyleSheet, Text, KeyboardAvoidingView, TextInput, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation, useIsFocused } from '@react-navigation/native';
import Themes from '../assets/Themes';
import FeelingContext from '../components/FeelingContext';
import React, { useContext, useState, useEffect } from 'react';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'; 

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');


export default function ColorMenu({route}) {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    const [newFeeling, setNewFeeling] = useState('')
    const [showInputFeeling, setShowInputFeeling] = useState('')
    const [localColorMapping, setLocalColorMapping] = useState(context.colorMapping)
    useEffect(() => {
        if (route.params?.feeling){
            let temp = localColorMapping
            temp[route.params.feeling] = route.params.hex
            setLocalColorMapping(temp)
        }
        setShowInputFeeling('')
        setNewFeeling('')
    }, [context.colorMapping]);
    return (
        <SafeAreaView style={styles.container}>
            <View><Text style={styles.title}>Edit Colour & Emotion</Text></View>
            <View><Text style={[styles.subtitle, {textAlign: 'center'}]}>Select an emotion to change its color or add a new emotion</Text></View>
            <View style={styles.feelingsContainer}>
            {showInputFeeling.length > 0 && 
                        <View style={styles.inputHolder}>
                            <TextInput style={styles.feelingInput} placeholder={`Add ${showInputFeeling} emotion`} value={newFeeling} onChangeText={(text) => setNewFeeling(text)} />
                            <TouchableOpacity onPress={() => {
                                navigator.navigate("ColorSelection", {feeling: newFeeling, parent: showInputFeeling})
                            }}><FontAwesome5 name="arrow-circle-up" size={26} color={newFeeling.length > 0 ? '#59afff' : '#c3c3c3'} /></TouchableOpacity>
                        </View>
                    }
                <ScrollView >
                    {Object.keys(context.emotionsData).map(feeling => {
                        return (
                            <View>
                                <View style={styles.feelingGroup}>
                                    <TouchableOpacity onPress={() => {
                                        navigator.navigate("ColorSelection", {feeling: feeling})
                                    }} style={[styles.basic, {backgroundColor: localColorMapping[feeling]}]}>
                                        <Text style={styles.basic}>{feeling}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setShowInputFeeling(feeling)
                                    }} style={[styles.secondaryView, {backgroundColor: localColorMapping[feeling]}]}>
                                        <AntDesign name="plus" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.secondaryContainer}>
                                    {context.emotionsData[feeling].map(secondary => {
                                        return (
                                            <TouchableOpacity onPress={() => {
                                        navigator.navigate("ColorSelection", {feeling: secondary})
                                    }} style={[styles.secondaryView, {backgroundColor: localColorMapping[secondary]}]}>
                                                <Text style={styles.secondary}>{secondary}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                    
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: Themes.background,
        flexDirection: 'column',
        alignItems: 'center',
    },
    feelingGroup: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    feelingsContainer: {
        height: '70%',
        width: '90%'
    },
    inputHolder: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    feelingInput: {
        fontSize: 25,
        width: '90%',
        left: '5%'
    },
    secondary: {
        fontSize: 20
    },
    basic: {
        borderRadius: 10,
        padding: 5,
        fontSize: 25, 
    },
    secondaryView: {
        margin: 5,
        padding: 10,
        borderRadius: 10,
    },
    secondaryContainer: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    title: {
        fontWeight: '800',
        fontSize: 25,
        marginTop: 50
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '700',
        margin: 30
    },
});