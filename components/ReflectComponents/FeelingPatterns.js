import React, { useContext, useEffect, useState } from 'react'

import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import FeelingContext from '../FeelingContext';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 
import ColorBreakdown from '../../screens/ColorBreakdown';

export default function FeelingPatterns({route, navigator}) {
    const context = useContext(FeelingContext);
    var hardcodedTopFeelings = ['powerful', 'amazed', 'peaceful', 'stressed', 'joyful']
    const [localColorMapping, setLocalColorMapping] = useState(context.colorMapping)
    useEffect(() => {
        if (route?.params?.feeling){
          let temp = localColorMapping
          temp[route.params.feeling] = route.params.hex
          setLocalColorMapping(temp)
      }
      console.log(localColorMapping)
  }, [context.colorMapping]);
    const renderPatterns = hardcodedTopFeelings.map((feeling) => {
        return (
            <ColorBreakdown feeling={feeling} localColorMapping={localColorMapping} navigator={navigator}/>
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
    }
})