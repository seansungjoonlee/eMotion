import React from 'react'
import { View, Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from 'react-native'

export default function OnboardingItem ({item, navigator}) {
    const { width } = useWindowDimensions()
    return (
        <View style={[styles.container, {width}]}>
            <Image source={require('../../assets/emotion-logo.png')} />
            <Image source={item.image} style={[styles.image, {width: width/1.2, resizeMode: 'contain'}]}/>
            <View style={{ flex: 0.3 }}>
                <Text style={styles.title}>{item.title}</Text>
                {item.description.map((description)  => {
                    return (
                        <Text style={styles.description}>{description}</Text>
                    )
                })}
            </View>
            <TouchableOpacity style={styles.skip} onPress={() => navigator.navigate('CurrentEmotion')}><Text style={styles.description}>Get Started</Text></TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 0.5,
        justifyContent: 'center'
    },
    title: {
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: '#89B0AD',
        textAlign: 'center',
    },
    description: {
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 20,
        paddingHorizontal: 20
    },
    skip: {
        padding: 10, 
        borderRadius: 10,
        fontSize: 58,
        borderWidth: 2,
        borderColor: 'black'
    }
})