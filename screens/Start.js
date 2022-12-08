import { ImageBackground, StyleSheet, Text, Image, View, SafeAreaView, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Emotion from '../components/Emotion';
import Themes from '../assets/Themes';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export default function Start() {
    const navigator = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}> eMotion </Text>
            <Text style={styles.subtitle}> feel your workouts! </Text>
            {/* replace with emotion component */}
            <Pressable style={styles.emotionBox} onPress={() => navigator.navigate('HowDoYouFeel')}>
                <Emotion feelings={['startScreen']}/>
                <Text style={styles.buttonText}>click to begin</Text>
            </Pressable>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: Themes.background,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.045,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: '12%'
    },
    subtitle: {
        fontFamily: 'Avenir',
        fontStyle:'italic',
        fontSize: SCREEN_HEIGHT * 0.045,
        textAlign: 'center',
        paddingTop: '6%',
        paddingBottom: '5%'
    },
    emotionBox: {
        aspectRatio: 1,
        height: '50%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.045,
        position: 'absolute',
    },    
});