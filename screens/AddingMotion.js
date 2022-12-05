import { View, Text, SafeAreaView, Pressable, StyleSheet } from 'react-native';
import Themes from '../assets/Themes';
import Movement from '../components/Movement';
import { useContext } from 'react';
import FeelingContext from '../components/FeelingContext';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 
import AddMotionSearch from '../components/AddMotionSearch';


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
            <Text style={styles.title}>
                adding motion:
            </Text>
            <Text style={styles.date}>
                {date}
            </Text>
            <View style={styles.movementBox}>
                <Movement movementFeelings={context.movementFeelings(movement)}/>
            </View>
            <AddMotionSearch movement={movement}/>
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
        fontSize: 25
    },
    date: {
        fontSize: 25
    },
    movementBox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
        margin: 15,
    },      
    backArrowBox: {
        height: 45,
        width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
});