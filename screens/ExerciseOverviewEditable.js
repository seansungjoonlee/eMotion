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


export default function ExerciseOverviewEditable({ route }) {
    const navigator = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const context = useContext(FeelingContext);
    const { date, name, fullNames } = route.params;
    
    let note = "";
    const movement = context.getMovement(date);
    for (let i = 0; i < movement.motionEntry.length; i++) {
        if (movement.motionEntry[i].name === fullNames[0]) {
            note = movement.motionEntry[i].note;
        }
    }

    const [newNote, setNewNote] = useState(note);
    
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
        motionData.push({feelings: feelings[i], fullName: fullNames[i] });
    }


    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.backArrowBox}>
            <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => navigator.navigate('MovementOverview', {date: date})}/>
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
            renderItem={({ item }) => (
                <View style={styles.emotionLog}>
                    <Pressable style={styles.emotionBox} onPress={() => navigator.navigate('HowDoYouFeelAddMotion', {status: 'edit', fullNames: fullNames, name: item.fullName, allFeelings:feelings, feelings:item.feelings, date:date, note:note, movement: context.getMovement(date)})}>
                        <Emotion feelings={item.feelings}/>
                    </Pressable>
                </View>
            )}
            />
        </View>
        <View style={styles.noteLabel}>
            <Text style={styles.noteHeader}>
                note:
            </Text>
        </View>
        <View style={styles.note}>
            <TextInput
                multiline={true}
                numberOfLines={4}
                onChangeText={newNote => setNewNote(newNote)}
                style={{padding: 10}}
                fontSize={20}
                defaultValue={note}
                editable={true}
            />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {
                context.editNote('reflection', date, fullNames[0], newNote);
                navigator.navigate('ExerciseOverview', {date: date, name: name, fullNames: fullNames})
            }}>
                <Text>
                    save changes
                </Text>
            </TouchableOpacity>
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
    emotionLog: {
        width: 375,
        flexDirection: 'column',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
    },
    feelingsList: {
        height: 85,
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
    noteHeader: {
        fontSize: 25,
        marginHorizontal: 60
    },
    backArrowBox: {
        height: 45,
        width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'center'
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
    }
});