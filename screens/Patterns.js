import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import FeelingContext from '../components/FeelingContext';
import { basicToSecondary } from '../assets/feelings';

export default function Patterns ({navigator}) {
    const context = useContext(FeelingContext);
    const [localColorMapping, setLocalColorMapping] = useState(context.colorMapping)

    return (
        <SafeAreaView>
            <View style={styles.instructionsContainer}>
                <View style={styles.titleContainer}><Text style={styles.title}>Feeling Patterns</Text><MaterialCommunityIcons name="circle-half-full" size={24} color="black" /></View>
                <Text style={styles.title}
                >( Select an emotion to analyze )</Text>
            </View>
            <View style={styles.colorsContainer}>
            <ScrollView style={styles.emotionsContainer}>
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
            <TouchableOpacity onPress={() => navigator.navigate()}></TouchableOpacity>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    title: {
        fontWeight: '800',
        fontSize: 24,
        textAlign: 'center'
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    instructionsContainer: {
        marginTop: 20,
        marginBottom: 20
    },
    emotionsContainer: {
        backgroundColor: 'white', 
        height: 600,
        borderRadius: 20, 
        width: '80%'
    },
    color: {
        width: 150,
        height: 150,
        borderRadius: 75,
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    colorsContainer: {
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    feelingGroup: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    basic: {
        borderRadius: 10,
        padding: 5,
        fontSize: 25, 
    },
    secondary: {
        fontSize: 20
    },
    secondaryContainer: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    secondaryView: {
        margin: 5,
        padding: 10,
        borderRadius: 10,
    },
})