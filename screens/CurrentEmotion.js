import { TextInput, StyleSheet, Text, Dimensions, View, SafeAreaView, Image, TouchableOpacity, Pressable} from 'react-native';
import Emotion from '../components/Emotion';
import { useNavigation } from '@react-navigation/native';
import FeelingContext from '../components/FeelingContext';
import React, { useContext } from 'react';
import Themes from '../assets/Themes';
import Movement from '../components/Movement';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');


export default function CurrentEmotion() {

    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    let firstEmotion = (context.movementData[context.getCurrentMovementIndex()].motionEntry.length === 1);
    
    function Visualization() {
        if (firstEmotion) {
            return (
                <View style={styles.movementBox}>
                    <Pressable style={styles.emotionBox} onPress = {() => {
                navigator.navigate('HowDoYouFeel')}}>
                        <Emotion feelings={context.currentFeelings}/>
                    </Pressable>
                </View>
            )
        } else {
            return (
                <Pressable style={styles.movementBox} onPress = {() => {
                    navigator.navigate('HowDoYouFeel')}}>
                    <Movement movementFeelings={context.movementFeelings(context.movementData[context.getCurrentMovementIndex()])} status={'current'}/>
                </Pressable>
            )
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Today's Feelings
                </Text>
            </View>

            <Visualization/>
            <TouchableOpacity style = {styles.button} onPress={() => {
                context.updateMotion('choosing', [])
                navigator.navigate('ChooseMotion')}
            }>
                <Text style = {styles.buttonText}> new movement </Text>
            </TouchableOpacity>
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
        backgroundColor: Themes.background
    },
    title: {
        fontSize: SCREEN_HEIGHT * 0.045,
        textAlign: 'center',
        paddingTop: '7%',
        fontFamily: 'Avenir',
        fontWeight: 'bold',
    },
    buttonText: {
        fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.03
    },  
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Themes.background,
        borderWidth: 1,
        marginTop: '8%',
        width: '65%',
        height: '8%',
        borderRadius: 1000
     },
     movementBox: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
        height: '58%'
     },
     emotionBox: {
        aspectRatio: 1,
        height: '50%',
        position: 'absolute'
     },
     titleContainer: {
        height: '11%'
     },
});