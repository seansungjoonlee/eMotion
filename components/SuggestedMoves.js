import { ImageBackground, StyleSheet, Text, ScrollView, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeelingContext from '../components/FeelingContext';
import { useContext } from 'react';

export default function SuggestedMoves({suggestedMovementsList}) {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    const renderSuggestedMovements = suggestedMovementsList.map(movement => {
        return (
            <Pressable style={styles.card} onPress={() => {
                    navigator.navigate('DuringMotion', {selectedMovement: movement.name})
                }}>
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
        height: 150
    },
    title: {
        margin: 10,
        fontWeight: "800" 
    },
    card: {
        width: 80,
        height: 80,
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