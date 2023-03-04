import React, {useRef, useState, useEffect} from 'react'
import { TouchableWithoutFeedback, View, Image, StyleSheet, Animated } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import logMovementComplete from '../assets/icons/log_movement_complete.png'
import startMovingComplete from '../assets/icons/start_movement_complete.png'
import MainTask from './MainTask'

const NewMotionButton = ({opened, toggleOpened}) => {
    const animation = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.timing(animation, {
            toValue: opened ? 1 : 0,
            duration: 300,
            friction: 2,
            useNativeDriver: false
        }).start()
    }, [opened, animation])
    const opacity = {
        opacity: animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0, 1]
        })
    }
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => {console.log('navigate to how do you feel')}}>
                <Animated.View style={[styles.item, opacity, {
                    transform: [{
                        translateX: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 0],
                        }),
                    },
                    {
                        translateY: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 0]
                        })
                    }]
                }]}><Image source={logMovementComplete} resizeMode="contain" style={styles.itemIcon}/></Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => console.log('fuck')}>
                <Animated.View style={[styles.item, opacity, {
                    transform: [{
                        translateX: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 0],
                        }),
                    },
                    {
                        translateY: animation.interpolate({
                            inputRange: [0,1],
                            outputRange: [0, 0]
                        })
                    }]
                }, {left: 50}]}><Image source={startMovingComplete} resizeMode="contain" style={styles.itemIcon}/></Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback style={[styles.button, styles.shadow]} onPress={toggleOpened}>
                <Animated.View style={[styles.buttonInside, {transform: [{
                    rotate: animation.interpolate({
                        inputRange: [0,1],
                        outputRange: ['0deg', '45deg']
                    })
                }]}]}>
                    <Ionicons name={'add'} size={35} color='white' />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        top: -30,

    },
    shadow:{
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowRadius: 3.5,
        elevation: 5,
    },
    buttonInside: {
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#d9d9d9',
        width: 60,
        height: 60,
        borderRadius: 30
    },
    item: {
        position: 'absolute',
        top: -50,
        left: -50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d9d9d9',
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    itemIcon: {
        width: 30, height: 30
    }
})
export default NewMotionButton;