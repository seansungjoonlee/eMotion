import { TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, Pressable, View, Text, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState, useEffect } from "react";
import FeelingContext from '../components/FeelingContext';
import { useContext } from 'react';
import Themes from "../assets/Themes";
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import Autocomplete from 'react-native-autocomplete-input';
import motionData from "../utils/motionData";
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export default function DuringMotion({route}) {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    const [movementStarted, setMovementStarted] = useState(false)
    const [movement, setMovement] = useState(route.params.selectedMovement)
    const [text, setText] = useState('')
    const [motions, setMotions] = useState([])
    useEffect(() => {
        setMotions(getMotions(motionData));

    }, [])

    const getMotions = (motionData) => {
        var motionList = []
        for (var feeling of Object.keys(motionData)){
            for (var motion of Object.keys(motionData[feeling])){
                if (motionList.indexOf(motion) < 0){
                    motionList.push(motion)
                }
            }
        }
        console.log(motionList)
        return motionList;
    }
    const filterData = (data) => {
        var filteredList = []
        if (text.length == 0){
            return []
        }
        else {
            for (var motion of data){
                if (motion.toLowerCase() == text.toLowerCase()){
                    return []
                }
                if (motion.toLowerCase().includes(text.toLowerCase())){
                    filteredList.push(motion)
                }
            }
            return filteredList
        }
    }
    const renderItem = (item) => {
        return(
            <TouchableOpacity onPress={() => setText(item.item)}>
                <Text style={styles.itemText}>{item.item}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.movementContainer}>
                {movement.length > 0 && <Text style={styles.motion}>{movement}</Text>}
                {movement.length == 0 && 
                    motions.length > 0 && 
                    <View style={styles.autocompleteContainer}>
                        <Autocomplete
                            data={filterData(motions)}
                            value={text}
                            onChangeText={setText}
                            placeholder="Type a movement"
                            inputContainerStyle={styles.inputText}
                            flatListProps={{
                            keyExtractor: (_, idx) => idx,
                            renderItem: renderItem}}
                            />
                    </View>}
            </View>
            {!movementStarted && (movement.length > 0 || text.length > 0) && 
                <View style={styles.bottomViewContainer}>
                    <TouchableOpacity style={styles.startMovingContainer} onPress={() => {
                            setMovementStarted(true)
                            if (text.length > 0) setMovement(text)
                        }}>
                        <Text style={styles.bottomText}>Start Moving</Text>
                    </TouchableOpacity>
                </View>
                }
            {movementStarted && 
            <View style={styles.bottomViewContainer}>
                <TouchableOpacity style={styles.startMovingContainer} onPress={() => 
                    {
                        context.updateMotion(text.length > 0 ? text : movement, []);
                        navigator.navigate('HowDoYouFeel', {movement: text.length > 0 ? text : movement})
                    }}>
                    <Text style={styles.bottomText}>End movement</Text>
                </TouchableOpacity>
            </View>}
            <View style={styles.backArrowBox}>
                <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => {
                navigator.goBack()}}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
    },
    movementContainer:{
        width: '100%',
        height: '75%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 20
    },
    inputText: {
        fontSize: 40,
        fontWeight: '400'
    },
    title: {
        fontSize: SCREEN_HEIGHT * 0.045,
    },
    motion: {
        fontWeight: 'bold',
        fontSize: SCREEN_HEIGHT * 0.045,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Themes.background,
        borderWidth: 1,
        marginTop: '6%',
        width: '65%',
        borderRadius: 1000
     },
    noteButton: {
        height: '100%',
        width: '50%',
        backgroundColor: Themes.background,
        borderRadius: 1000,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notesSheet: {
        width: '85%',
        height: '80%',
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    centeredView: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    noteBox: {
        height: '80%',
        width: '80%',
        borderWidth: 1,
        marginBottom: '3%'
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '10%',
        width: '100%',
        paddingVertical: '2%',
        paddingHorizontal: '10%',
    },
    bottomText: {
        fontSize: 24,
        fontWeight: '200'
    },
    bottomViewContainer: {
        display: 'flex',
        alignItems: 'center',
        height: '25%',
        backgroundColor:' pink'
    },
    autocompleteContainer: {
        flex: 1,
        left: '10%',
        position: 'absolute',
        top: 100,
        zIndex: 1,
        backgroundColor: 'white',
        width: '80%'
      },
    headerContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '18%'
    },
    backArrowBox: {
        width: '100%',
        justifyContent: 'center',
        height: '7.5%',
        paddingHorizontal: '4%',
        position: 'absolute',
        top: 20
    },
    movementInput: {
        fontSize: 30
    }
});