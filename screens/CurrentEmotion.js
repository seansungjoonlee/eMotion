import { TextInput, Modal, StyleSheet, Text, Dimensions, View, Image, TouchableOpacity, Pressable} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import Emotion from '../components/Emotion';
import { useNavigation } from '@react-navigation/native';
import FeelingContext from '../components/FeelingContext';
import React, { useContext, useState, useEffect } from 'react';
import SuggestedMoves from '../components/SuggestedMoves';
import RecentMovements from '../components/RecentMovements';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export default function CurrentEmotion() {
    const options = ["today's feelings", "current eMotion"];
    const [selected, setSelected] = useState("today's feelings");
    const [movementFeelings, setMovementFeelings] = useState([])
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    const staticListMotions = ['Stretch', 'Walk to University Ave', 'Hike with Friends', 'Yoga']
    const [suggestedMovementsList, setSuggestedMovementsList] = useState(staticListMotions)
    useEffect(() => {
        var nestedFeelings = context.movementFeelings(context.movementData[context.getCurrentMovementIndex()])
        var temp = []
        for (var i = nestedFeelings.length-1; i >= 0; i--){
            for (var k = nestedFeelings[i].length-1; k >= 0; k--){
                temp.push(nestedFeelings[i][k])
            }
        }
        setMovementFeelings(temp)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Pressable style={styles.movementBox} onPress = {() => {
                navigator.navigate('HowDoYouFeel')}}>
                <Emotion feelings={movementFeelings} />
            </Pressable>
            <SuggestedMoves style={styles.suggested} suggestedMovementsList={suggestedMovementsList}/>
            <RecentMovements />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#eee'
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        // paddingTop: '7%',
        fontWeight: 'bold',
    },
    buttonText: {
        fontSize: SCREEN_HEIGHT * 0.03
    },  
     movementBox: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
        height: '30%',
        margin: 10
     },
     suggested: {
        backgroundColor: 'pink'
     },
     emotionBox: {
        aspectRatio: 1,
        height: '100%',
        position: 'absolute'
     },
     titleContainer: {
        height: '11%',
        justifyContent: 'center',
        width: '90%',
        fontSize: 20
     },
     optionText: {
        fontSize: 20
     }
});