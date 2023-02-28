import { ImageBackground, StyleSheet, Text, ScrollView, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeelingContext from '../components/FeelingContext';
import { useContext } from 'react';
import Emotion from './Emotion';

export default function SuggestedMoves({suggestedMovementsList}) {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    const renderSuggestedMovements = suggestedMovementsList.map(movement => {
        return (
            <Pressable style={styles.card} onPress={() => {
                    navigator.navigate('DuringMotion', {selectedMovement: movement.name})
                }}>
                {movement.motionFeelings && 
                    <View style={styles.emotion}>
                        <Emotion feelings={movement.motionFeelings} noPulse={true} />
                    </View>}
                <Text style={styles.cardText}>{movement.name}</Text>
            </Pressable>
        )
    })
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Let's start moving again.</Text>
            <ScrollView horizontal style={styles.cardContainer}>
                <Pressable style={styles.card} onPress={() => {
                        navigator.navigate('DuringMotion', {selectedMovement: ''})
                    }}>
                    <Text style={styles.plus}>+</Text>
                </Pressable>
                {renderSuggestedMovements}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        overflow: 'scroll'
    },
    container: {
        height: 200
    },
    title: {
        margin: 10,
        fontWeight: "800" 
    },
    emotion: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    card: {
        width: 100,
        height: 100,
        borderRadius: 20,
        margin: 10,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        elevation: 20,
        shadowRadius: 3,
    },
    plus: {
        fontSize: 30
    },
    cardText: {
        fontSize: 15,
        fontWeight: "600" 
    }
})