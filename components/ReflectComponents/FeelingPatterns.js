import React, { useContext, useEffect, useState } from 'react'

import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import FeelingContext from '../FeelingContext';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 
import motionData from '../../utils/motionData';
import { useIsFocused } from '@react-navigation/native';
export default function FeelingPatterns({route, navigator}) {
    const context = useContext(FeelingContext);
    var hardcodedTopFeelings = ['powerful', 'amazed', 'peaceful', 'stressed', 'joyful']
    const [localColorMapping, setLocalColorMapping] = useState(context.colorMapping)
    const isFocused = useIsFocused()
    useEffect(() => {
        if (route?.params?.feeling){
          let temp = localColorMapping
          temp[route.params.feeling] = route.params.hex
          setLocalColorMapping(temp)
      }
      console.log(localColorMapping)
  }, [isFocused]);
    const renderPatterns = hardcodedTopFeelings.map((feeling) => {
        return (
            <View style={styles.breakdownContainer}>
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
    })
   
    return (
        <View style={styles.shadow}>
            <View style={styles.container}>
                <View style={styles.titleView}><Text style={styles.title}>Your Recent eMotions</Text></View>
                <View style={{height: 400}}><ScrollView>{renderPatterns}</ScrollView></View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 10,
        overflow: 'hidden',
    },
    titleView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    colorCircle: {
        width: 20, height: 20, borderRadius: 10
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#bdbdbd'
    },
    feelingInfo: {
        flexDirection: 'row',
        margin: 10
    },
    feeling: {
        marginLeft: 10,
    },
    shadow: {
        borderRadius: 16,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 8,

    },
    icon: {
        position: 'absolute',
        left: 10,
        top: 5
    },
    text: {
        textAlign: 'center'
    },
    smallText: {
        fontSize: 14,
        textAlign: 'right'
    },
    daysOfWeek: {
        color: '#626262'
    },
    title: {
        fontSize: 20,
        fontWeight: '600'
    },
    dayCircle: {
        width: 30,
        height: 30,
        borderWidth: 2,
        borderRadius: 30,
        borderColor: '#D2D2D2'
    },
    weekContainer: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    subtitle: {
        fontWeight: '300',
        fontSize: 15,
        textAlign: 'center',
        marginLeft: 10
    },
    breakdownContainer: {
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
})