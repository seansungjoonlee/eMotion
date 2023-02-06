import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native';
import Emotion from './Emotion';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import FeelingContext from './FeelingContext';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

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
        width: SCREEN_WIDTH * 0.75,
        marginVertical: 10,
        flexDirection: 'column',
        // alignItems: 'left',
        // justifyContent: 'center',
        padding: '3%'
    },
    name: {
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: SCREEN_HEIGHT * 0.03,
    },
    basedOn: {
        flexDirection: 'row',
        // justifyContent: 'left',
        // alignItems: 'center',
    },
    emotionBox: {
        height: SCREEN_HEIGHT * 0.06,
        aspectRatio: 1,
    },
    basedOnText: {
        fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.0225
    }
});