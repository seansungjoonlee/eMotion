import { StyleSheet, Text,View, SafeAreaView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import BasicSelection from '../components/BasicSelection';
import { useNavigation } from '@react-navigation/native';
import FeelingContext from '../components/FeelingContext';
import React, { useContext, useState } from 'react';
import Themes from '../assets/Themes';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 


const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

function getTime() {
    let newDate = new Date();
    let time = newDate.getHours();
    if(newDate.getMinutes() < 10) {
      time += ':0' + newDate.getMinutes();
    } else {
      time += ':' + newDate.getMinutes();
    }
    return time;
  }


export default function HowDoYouFeel() {
    const context = useContext(FeelingContext);
    const navigator = useNavigation();
    const [text, setText] = useState('')

    let button = [];
    if (context.basic.length > 0) {
        button = [
            <TouchableOpacity 
                style = {styles.selectButton} key={context.basic.length}
                onPress={() => {
                    // context.updateSecondary(context.basic);
                    console.log("TRACK: finished selecting feelings: " + getTime());
                    navigator.navigate('ChooseMotion');
                }}>
                <Text style = {styles.buttonText}> select</Text>
            </TouchableOpacity>
        ]
    }

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.backArrowBox}>
            <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => {
                if (context.getCurrentMovementIndex() === -1) {
                    navigator.navigate('Start');
                }
                else if (context.motion.name === '') {
                    navigator.navigate('CurrentEmotion');
                }
                else if (context.motion.name === 'choosing') {
                        navigator.navigate('ChooseMotion');
                }
                else {
                    navigator.navigate('DuringMotion');
                }
            }}/>
        </View>
        <Text style={styles.title}> How do you feel? </Text>
        <Text style={styles.subtitle}> (select all that apply) </Text>
        <View style={styles.selector}>
            <BasicSelection basic={context.basic} setBasic={context.setBasic}/>
        </View>
        <Text style={styles.smallText}>Can't find the right emotion?</Text>

        <View style={styles.input}>
            <TextInput
                onChangeText={setText}
                value={text}
                placeholder={'Enter new emotion'}
                style={styles.textInput}
                />
            <TouchableOpacity onPress={() => text.length > 0 && navigator.navigate('TestColorPage', {newWord: text})} style={[styles.icon, {backgroundColor: text.length > 0 ? '#58afff' : '#ddd'}]}>
                <AntDesign name="arrowup" size={24} color="white" />
            </TouchableOpacity>
        </View>
        {button}
    </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Themes.background
    },
    title: {
        fontSize: SCREEN_HEIGHT * 0.035,
        textAlign: 'center',
        fontFamily: 'Avenir',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: SCREEN_HEIGHT * 0.03,
        fontFamily: 'Avenir',
        textAlign: 'center',
        paddingTop: '1%',
        paddingBottom: '7%'
    },
    // take out
    buttonText: {
        fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.03,
    },  
    selectButton: {
        alignItems: 'center',
        justifyContent: 'center',
        //padding: 20,
        marginTop: 10,
        width: '45%',
        height: '8%',
        borderRadius: 1000,
        borderWidth: 1
     },   
     backArrowBox: {
        width: '100%',
        justifyContent: 'center',
        height: '7.5%',
        paddingHorizontal: '4%',
    },
    selector: {
        height: 400
    },
    input: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 7,
        width: '70%',
        padding: 10,
        flexDirection: 'row'
    },
    textInput: {
        width: '90%'
    },
    smallText: {
        fontSize: 13
    },
    icon: {
        borderRadius: 30,
        padding: 2,
        backgroundColor: '#ddd'
    }
});