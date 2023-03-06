import React from 'react'
import { View, Text, Image, useWindowDimensions, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function WorkInProgress() {
    const navigator = useNavigation();

    return (
        <SafeAreaView style={{margin:20}}>
            <Text style={{marginTop: 30, fontSize: 20, textAlign: 'center'}}>Whoops! You've hit a page that doesn't exist. Stay tuned for updates :) </Text>
            <Image style={styles.image} resize="stretch" source={require('../assets/work_in_progress.jpeg')}/>
            <View style={styles.backArrow}>
            <MaterialIcons
            name="keyboard-backspace"
            size={50}
            color="black"
            onPress={() => navigator.goBack()}
            />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    backArrow: {
        height: 50,
        position: 'absolute',
        left: 0,
        marginTop: 20,
      },
      image: {
        width: 320,
        height: 400
      }
})