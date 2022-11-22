import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native';
import Emotion from './Emotion';

function separateEmotions(feelings) {
    let emotions = [];
    for (let i = 0; i < feelings.length; i++) {
        emotions.push(
            <View style={styles.emotionBox}>
                <Emotion feelings={[feelings[i]]}/>
            </View>
        )
    }
    return emotions;
};

export default function MotionSuggestion({ name, feelings }) {
    let emotions = separateEmotions(feelings);
    return (
        <Pressable style={styles.motion}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.basedOnText}>
                <Text>based on: </Text>
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
        fontWeight: 'bold',
        fontSize: 20,
    },
    basedOnText: {
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
    },
    emotionBox: {
        height: 40,
        width: 40,
    }
});
