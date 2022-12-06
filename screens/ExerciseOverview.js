import { TextInput, Modal, ImageBackground, StyleSheet, Text, Button, Image, View, SafeAreaView, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import BasicSelection from '../components/BasicSelection';
import { useState } from 'react';
import { TabRouter, useNavigation } from '@react-navigation/native';
import Emotion from '../components/Emotion';
import SuggestedMotions from '../components/SuggestedMotions';
import FeelingContext from '../components/FeelingContext';
import React, { useContext, useEffect } from 'react';
import Themes from '../assets/Themes';
import { MaterialIcons } from '@expo/vector-icons'; 
import SearchedMotions from '../components/SearchedMotions';
import { Feather } from '@expo/vector-icons'; 
import EmotionList from '../components/EmotionList';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import context from 'react-context';
import ExerciseOverviewBottom from '../components/ExerciseOverviewBottom'
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'; 



export default function ExerciseOverview({ route }) {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    const { date, name, fullNames } = route.params;
    const [details, setDetails] = useState(false);
    
    let note = "";
    const movement = context.getMovement(date);
    for (let i = 0; i < movement.motionEntry.length; i++) {
        if (movement.motionEntry[i].name === fullNames[0]) {
            note = movement.motionEntry[i].note;
        }
    }

    const [newNote, setNewNote] = useState(note);
    const [editable, setEditable] = useState(false);
    
        
    let feelings = [];
    let i = 0;
    while (movement.motionEntry[i].name !== fullNames[0]) {
        i += 1
    }
    for (let j = 0; j < fullNames.length; j++) {
        feelings.push(movement.motionEntry[i+j].feelings);
    }

    let motionData = [];
    for (let i = 0; i < fullNames.length; i++) {
        motionData.push({feelings: feelings[i], fullName: fullNames[i], details: details });
    }

    function renderWords({ item }) {
        return (
            <View style={styles.centeredWord}>
                <Text style={styles.feeling}>
                    {item}
                </Text>
            </View>
        )
    }

    function renderEmotion({ item }) {
        if (item.details) {
            return (
                <View style={styles.emotionLogDetails}>
                    <Pressable style={styles.emotionBox} onPress={() => navigator.navigate('HowDoYouFeelAddMotion', {status: 'edit', fullNames: fullNames, name: item.fullName, allFeelings:feelings, feelings:item.feelings, date:date, note:note, movement: context.getMovement(date)})}>
                        <Emotion feelings={item.feelings}/>
                    </Pressable>
                    <View style={styles.feelingBox}>
                        <Text style={styles.feelingHeader}>
                            feelings:
                        </Text>
                        <View style={styles.flatListBox}>
                            <FlatList
                                data={item.feelings}
                                renderItem={(item) => renderWords(item)}
                                keyExtractor={(item, index) => {
                                return item.id;
                                }}
                                />
                        </View>
                    </View>
                </View>
            )
        } else {

            return (
                <View style={styles.emotionLog}>
                    <Pressable style={styles.emotionBox} onPress={() => navigator.navigate('HowDoYouFeelAddMotion', {status: 'edit', fullNames: fullNames, name: item.fullName, allFeelings:feelings, feelings:item.feelings, date:date, note:note, movement: context.getMovement(date)})}>
                        <Emotion feelings={item.feelings}/>
                    </Pressable>
                </View>
            )
        }
    }


    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.backArrowBox}>
            <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => navigator.navigate('MovementOverview', {date: date})}/>
            <Ionicons name="information-circle-outline" size={30} color="black" onPress={() => setDetails(!details)} />
        </View>
        <Text style={styles.text}>{date}</Text>
        <Text style={styles.text}>{name}</Text>
        <View style={styles.list}>
            <SwiperFlatList
                index={0}
                showPagination
                paginationDefaultColor='gray'
                paginationActiveColor='black'
                data={motionData}
                renderItem={(item) => renderEmotion(item)}
            />
        </View>
        <ExerciseOverviewBottom setEditable={setEditable} editable={editable} note={newNote} date={date} fullNames={fullNames}/>
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
    centeredWord: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emotionLog: {
        width: 375,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    emotionLogDetails: {
        width: 375,
        paddingLeft: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
    },
    feeling: {
        fontSize: 20,
    },
    list: {
        height: '35%',
    },
    noteLabel: {
        width: '100%',
        height: '8%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        fontSize: 20
    },
    emotionBox: {
        height: 150,
        width: 150,
        margin: 20,
    },
    note: {
        padding: 10,
        alignItems: 'left',
        justifyContent: 'flex-start',
        width: 300,
        height: '20%',
        backgroundColor: "grey",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: Themes.background
    },
    backArrowBox: {
        height: 45,
        width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        height: 50,
        width: 250,
        backgroundColor: Themes.background,
        borderRadius: 1000,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    centeredView: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '7%',
        width: '100%',
        paddingHorizontal: 30
    },
    feelingBox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    feelingHeader: {
        fontSize: 25
    },
    flatListBox: {
        height: '50%'
    }

});