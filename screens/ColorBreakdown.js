import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'


export default function ColorBreakdown (props) {
    const feeling = props.route.params.feeling
    return (
        <SafeAreaView>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Feeling Patterns</Text>
                <MaterialCommunityIcons
                name="circle-half-full"
                size={24}
                color="black"
                />
            </View>
            <View><Text>Selected emotion: {feeling}</Text></View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({ 
    title: {
        fontWeight: '800',
        fontSize: 24,
        textAlign: 'center',
      },
      titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
})