import React, { useContext, useState, useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import motionData from '../utils/motionData';
import FeelingContext from '../components/FeelingContext'


export default function ColorBreakdown ({feeling, navigator, localColorMapping}) {
    // const feeling = props.route.params.feeling
    useEffect(() => {
      console.log('heelo')
    }, [localColorMapping])
    return (
        <View style={styles.container}>
            <View style={styles.selectedContainer}>
                <TouchableOpacity onPress={() => navigator.navigate('ColorSelection', {feeling: feeling})} style={styles.emotionContainer}><Text style={styles.emotionText}>{feeling} </Text><MaterialIcons name="edit" size={24} color={localColorMapping[feeling]} /></TouchableOpacity>
            </View>
            <View style={styles.explanationContainer}>
              {motionData[feeling] ? <View style={styles.subtitleContainer}><Text style={styles.subtitle}>Here are some activities you like to do when you're feeling <Text style={[styles.emotionText, {color: localColorMapping[feeling]}]}>{feeling}</Text>:</Text></View> : <View><Text style={styles.subtitle}>You haven't logged any motions with this feeling yet!</Text></View>}
                
                {motionData[feeling] && Object.keys(motionData[feeling]).map((activity, idx) => {
                    return (<Text style={styles.activity}>{idx+1}.&nbsp;{activity}</Text>)
                })}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({ 
      subtitle: {
        fontWeight: '300',
        fontSize: 15,
        textAlign: 'center',
        marginLeft: 10
    },
    container: {
      borderWidth: 1,
      marginBottom: 10,
      marginTop: 10,
      borderRadius: 10
    },
    subtitleContainer: {
        flexDirection: 'row',
        marginBottom: 10
    },
    explanationContainer: {
        backgroundColor: 'white',
        width: '90%',
        left: '5%',
        borderRadius: 10,
        padding: 10
    },
      selectedContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
      },
      selectedText: {
        fontSize: 18
      },
      emotionText: {
        fontSize: 15, 
        fontWeight: '800',
        marginLeft: 4
      },
      emotionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      circle: {
        width: 20, 
        height: 20,
        borderRadius: 10
      },
      activity: {
        fontSize: 15,
        textAlign: 'center'
      },
      backArrow: {
        height: 50,
        position: 'absolute',
        left: 0,
        marginTop: 40
    },
})