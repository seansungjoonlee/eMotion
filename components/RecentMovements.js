import { TextInput, Modal, StyleSheet, Text, Dimensions, View, ScrollView, TouchableOpacity, Pressable} from 'react-native';
import FeelingContext from '../components/FeelingContext';
import { useContext, useState } from 'react';
import Emotion from './Emotion';
export default function RecentMovements () {
    const context = useContext(FeelingContext);
    const renderMovements = (i) => {
        return (
            <View>
                <View style={styles.date}><Text>{context.movementData[i].dateEntry}</Text></View>
                {context.movementData[i].motionEntry.map((entry, idx) => {
                    return (
                        <View key={idx} style={styles.movement}>
                            <View style={styles.emotionContainer}><Emotion feelings={entry.feelings} noPulse={true} /></View>
                        <Text style={styles.entryTitle}>{entry.name}</Text>
                    </View>
                    )
                })}
            </View>
        )
    }
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Recent</Text>
            {renderMovements(0)}
            {renderMovements(1)}
            {renderMovements(2)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '90%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10
    },
    title: {
        fontWeight: '700',
        fontSize: 20
    },
    date: {
        display: 'flex',
        alignItems: 'center',
    },
    entryTitle: {
        fontWeight: '700',
        fontSize: 20
    },
    emotionContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
        height: 40,
        margin: 10,
    },
    movement: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
    }
})