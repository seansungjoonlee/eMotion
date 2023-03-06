import React, { useContext} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import motionData from '../utils/motionData';
import FeelingContext from '../components/FeelingContext'


export default function ColorBreakdown (props) {
    const feeling = props.route.params.feeling
    const context = useContext(FeelingContext)
    const navigator = useNavigation();

    return (
        <SafeAreaView>
        <View style={styles.backArrow}>
                <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => navigator.goBack()}/>
            </View> 
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Feeling Patterns</Text>
                <MaterialCommunityIcons
                name="circle-half-full"
                size={24}
                color="black"
                />
            </View>
            <View style={styles.selectedContainer}>
                <Text style={styles.selectedText}>Selected emotion:</Text>
                <TouchableOpacity onPress={() => navigator.navigate('ColorSelection', {feeling: feeling})} style={styles.emotionContainer}><View style={[styles.circle, {backgroundColor: context.colorMapping[feeling]}]}/><Text style={styles.emotionText}>{feeling}</Text><MaterialIcons name="edit" size={24} color="#7c7c7c" /></TouchableOpacity>
            </View>
            <View style={styles.explanationContainer}>
                <View style={styles.subtitleContainer}><Text style={styles.subtitle}>Here are some activities you like to do when you're feeling <Text style={{color: context.colorMapping[feeling]}}>{feeling}</Text>:</Text></View>
                {motionData[feeling] && Object.keys(motionData[feeling]).map((activity, idx) => {
                    return (<Text style={styles.activity}>{idx+1}.&nbsp;{activity}</Text>)
                })}
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({ 
    title: {
        fontWeight: '800',
        fontSize: 24,
        textAlign: 'center',
      },
      titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
      },
      subtitle: {
        fontWeight: '800',
        fontSize: 18,
        textAlign: 'center',
        marginLeft: 10
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
        justifyContent: 'center'
      },
      selectedText: {
        fontSize: 18
      },
      emotionText: {
        fontSize: 24, 
        fontWeight: '800',
        marginLeft: 4
      },
      emotionContainer: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
      },
      circle: {
        width: 20, 
        height: 20,
        borderRadius: 10
      },
      activity: {
        fontSize: 20
      },
      backArrow: {
        height: 50,
        position: 'absolute',
        left: 0,
        marginTop: 40
    },
})