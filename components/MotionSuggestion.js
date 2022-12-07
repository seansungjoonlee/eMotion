import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native';
import Emotion from './Emotion';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import FeelingContext from './FeelingContext';

function separateEmotions(motionFeelings) {
    const context = useContext(FeelingContext);
    let emotions = [];
    for (let i = 0; i < motionFeelings.length; i++) {
        if (motionFeelings[i] in context.colorMapping) {
            emotions.push(
                <View style={styles.emotionBox} key={i}>
                    <Emotion feelings={[motionFeelings[i]]}/>
                </View>
            )
        }
    }
    return emotions;
};

export default function MotionSuggestion({ name, motionFeelings }) {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    let emotions = separateEmotions(motionFeelings);
    return (
        <Pressable style={styles.motion} onPress={() => {
            context.updateMotion(name, context.currentFeelings);
            context.updateMovement(name, context.currentFeelings, context.date);
            navigator.navigate('DuringMotion')}}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.basedOn}>
                <Text style={styles.basedOnText}>based on: </Text>
                {emotions}
            </View>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    motion: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        width: 275,
        marginVertical: 10,
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'center',
        padding: 10
    },
    name: {
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: 20,
    },
    basedOn: {
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
    },
    emotionBox: {
        height: 40,
        width: 40,
    },
    basedOnText: {
        fontFamily: 'Avenir',
        fontSize: 15
    }
});
