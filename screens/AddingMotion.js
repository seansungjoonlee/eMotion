import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import Themes from '../assets/Themes';
import Movement from '../components/Movement';
import { useContext } from 'react';
import FeelingContext from '../components/FeelingContext';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 
import AddMotionSearch from '../components/AddMotionSearch';


const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');

export default function AddingMotion({ route }) {
    const { movement } = route.params;
    const date = movement.dateEntry;
    const context = useContext(FeelingContext);
    const navigator = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.backArrowBox}>
                <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => navigator.navigate('MovementOverview', {date: date})}/>
            </View>
            <Text style={styles.date}>
                {date}
            </Text>
            <View style={styles.movementBox}>
                <Movement movementFeelings={context.movementFeelings(movement)}/>
            </View>
            <Text style={styles.title}>
                adding movement:
            </Text>
            <View style={styles.searchContainer}>
                <AddMotionSearch movement={movement}/>
            </View>
        </SafeAreaView>
    )
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
    title: {
        // fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: SCREEN_HEIGHT * 0.045
    },
    date: {
        // fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.045
    },
    movementBox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '25%',
        aspectRatio: 1,
        margin: '4%'
    },    
    backArrowBox: {
        width: '100%',
        justifyContent: 'center',
        height: '7.5%',
        paddingHorizontal: '4%',
    },
    searchContainer: {
        width: '100%',
        height: '48%'
    }
});