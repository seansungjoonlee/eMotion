import { Pressable, SafeAreaView, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Emotion from "../components/Emotion";
import React from "react";
import { MotionContext } from "../App";

export default function DuringMotion({ route }) {
    const navigator = useNavigation();
    const { name, allFeelings, setBasic, setSecondary, newFeelings } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <Text>
                motion: {name}
            </Text>
            <Pressable style={styles.emotionBox} onPress = {() => {
                setBasic([]);
                setSecondary([]);
                navigator.navigate('HowDoYouFeelMotion', {motion:name, allFeelings:allFeelings})}}>
                    <Emotion feelings={allFeelings}/>
            </Pressable>
            <Pressable style={styles.endButton} onPress={() => navigator.navigate('CurrentEmotion', {newFeelings:[], setBasic:setBasic, setSecondary:setSecondary })}>
                <Text>end motion</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    emotionBox: {
        width: 200,
        height: 200,
    },
    endButton: {
        height: 50,
        width: 200,
        marginTop: 40,
        backgroundColor: 'lightgrey',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});