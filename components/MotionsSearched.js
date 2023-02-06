import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native';
import Emotion from './Emotion';
import { useNavigation } from '@react-navigation/native';
import context from 'react-context';
import { useCallback, useContext } from 'react';
import FeelingContext from './FeelingContext';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export default function MotionsSearched({ name }) {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    return (
        <Pressable style={styles.motion} onPress={() => {
            context.updateMovement(name, context.currentFeelings, context.date);
            context.updateMotion(name, context.currentFeelings);
            navigator.navigate('DuringMotion')}}>
            <Text style={styles.name}>{name}</Text>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    motion: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        width: SCREEN_WIDTH * 0.75,
        marginVertical: 5,
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'center',
        padding: '3%'
    },
    name: {
        // fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: SCREEN_HEIGHT * 0.03,
    },
});
