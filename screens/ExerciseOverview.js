import { TextInput, Modal, StyleSheet, Text, Button, Image, View, SafeAreaView, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Emotion from '../components/Emotion';
import SuggestedMotions from '../components/SuggestedMotions';
import FeelingContext from '../components/FeelingContext';
import React, { useContext, useEffect } from 'react';
import Themes from '../assets/Themes';
import { MaterialIcons } from '@expo/vector-icons'; 
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import ExerciseOverviewBottom from '../components/ExerciseOverviewBottom'
import { FlatList } from 'react-native-gesture-handler';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');


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
            <Text style={styles.dots} onPress={() => setDetails(!details)}>
                ...
            </Text>
        </View>
        <Text style={styles.title}>{date}</Text>
        <Text style={styles.motion}>{name}</Text>
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
        width: SCREEN_WIDTH,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emotionLogDetails: {
        width: SCREEN_WIDTH,
        paddingLeft: '12%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.045,
    },
    motion: {
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: SCREEN_HEIGHT * 0.045
    },
    feeling: {
        fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.03,
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
        fontSize: SCREEN_HEIGHT * 0.03
    },
    emotionBox: {
        aspectRatio: 1,
        height: '60%',
        margin: '6%'
    },
    backArrowBox: {
        height: '7.5%',
        width: '100%',
        paddingHorizontal: '4%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    dots: {
        fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.045,
        fontWeight: 'bold'
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
        fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.0375
    },
    flatListBox: {
        height: '50%'
    }

});