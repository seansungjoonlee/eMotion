import { ImageBackground, StyleSheet, Text, Image, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';

export default function Start() {

return (
<SafeAreaView>
    <Text style={styles.title}> eMotion </Text>
    <Text style={styles.subtitle}> feel your workouts! </Text>
    {/* replace with emotion component */}
    <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>click to begin</Text>
        {/* include on press */}
    </TouchableOpacity>

</SafeAreaView>

);
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 100
    },
    subtitle: {
        fontStyle:'italic',
        fontSize: 30,
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 50
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        width: 300,
        height: 300,
        borderRadius: 300 / 2,
     },
    // take out
    buttonText: {
        fontSize: 30
    },     
});