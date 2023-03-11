import { StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation, useIsFocused } from '@react-navigation/native';
import Themes from '../assets/Themes';
import FeelingContext from '../components/FeelingContext';
import React, { useContext, useState, useEffect } from 'react';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'; 


export default function ColorMenu({route}) {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    const [newFeeling, setNewFeeling] = useState('')
    const isFocused = useIsFocused();

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
    useEffect(() => {
        setNewFeeling('')
        setShowInputFeeling('')
    }, [isFocused])
    return (
        <SafeAreaView style={styles.container}>
            <View><Text style={styles.title}>Edit Color & Emotion</Text></View>
            <View><Text style={[styles.subtitle, {textAlign: 'center'}]}>Select an emotion to change its color or add a new emotion</Text></View>
            <View style={styles.feelingsContainer}>
            {showInputFeeling.length > 0 && 
                        <View style={styles.inputHolder}>
                            <TextInput style={styles.feelingInput} placeholder={`Add ${showInputFeeling} emotion`} value={newFeeling} onChangeText={(text) => setNewFeeling(text)} />
                            {newFeeling.length > 0 && <TouchableOpacity onPress={() => {
                                navigator.navigate("ColorSelection", {feeling: newFeeling, parent: showInputFeeling})
                            }}><FontAwesome5 name="plus" size={26} color={'black'} /></TouchableOpacity>}
                        </View>
                    }
                <ScrollView>
                    {Object.keys(context.emotionsData).map(feeling => {
                        return (
                            <View>
                                <View style={styles.feelingGroup}>
                                    <TouchableOpacity onPress={() => {
                                        navigator.navigate("ColorSelection", {feeling: feeling})
                                    }} style={[styles.basic, {backgroundColor: localColorMapping[feeling]}]}>
                                        <Text style={styles.basic}>{feeling}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.secondaryContainer}>
                                    {context.emotionsData[feeling].map(secondary => {
                                        return (
                                            <TouchableOpacity onPress={() => {
                                        navigator.navigate("ColorSelection", {feeling: secondary, basic: feeling})
                                    }} style={[styles.secondaryView, {backgroundColor: localColorMapping[secondary]}]}>
                                                <Text style={styles.secondary}>{secondary}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                    
                                </View>
                                <View style={{display: 'flex', alignItems:'center'}}>
                                    <View style={styles.addButtonContainer}>
                                        <TouchableOpacity onPress={() => {
                                            setShowInputFeeling(feeling)
                                        }} style={[styles.addButton, {borderColor: localColorMapping[feeling]}]}>
                                            <FontAwesome5 name="plus" size={24} color={localColorMapping[feeling]} />
                                        </TouchableOpacity>
                                    </View>
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
        paddingLeft: 20,
        paddingRight: 20
    },
    feelingGroup: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        marginBottom: 5
    },
    feelingsContainer: {
        height: '84%',
        width: '90%',
        paddingBottom: 20
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
        width: '100%',
        textAlign: 'center'
    },
    secondaryView: {
        margin: 5,
        padding: 10,
        borderRadius: 10,
    },
    addButton: {
        width: 40, 
        height:40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 3, 
        borderRadius: 30,
        padding: 5
    },
    addButtonContainer: {
        backgroundColor: 'white',
        width: 45,
        height: 45,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 23,
        top: -20
    },
    secondaryContainer: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        backgroundColor: '#F1F1F1',
        paddingBottom: 20,
        borderRadius: 10
    },
    title: {
        fontWeight: '800',
        fontSize: 25,
        marginTop: 50
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '700',
        marginTop: 0,
        marginBottom: 30
    },
});