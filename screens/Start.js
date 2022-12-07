import { ImageBackground, StyleSheet, Text, Image, View, SafeAreaView, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Emotion from '../components/Emotion';
import Themes from '../assets/Themes';

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
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 50
    },
    subtitle: {
        fontFamily: 'Avenir',
        fontStyle:'italic',
        fontSize: 30,
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        width: 300,
        height: 300,
        borderRadius: 300 / 2,
     },
    emotionBox: {
        height: 300,
        width: 300,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    // take out
    buttonText: {
        fontFamily: 'Avenir',
        fontSize: 30,
        position: 'absolute',
    },    
});