import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Start from '../screens/Start';
import HowDoYouFeel from '../screens/HowDoYouFeel';
import CareToElaborate from '../screens/CareToElaborate';
import { NavigationContainer } from '../node_modules/@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DuringMotion from '../screens/DuringMotion';
import ChooseMotion from '../screens/ChooseMotion';
import CurrentEmotion from '../screens/CurrentEmotion';
import React from 'react';
import FeelingContext from '../components/FeelingContext';
import { useState } from 'react';
import { basicFeelings, basicToSecondary } from '../assets/feelings.js';
import Themes from '../assets/Themes.js';

export default function StartEmotionTask({ navigation }) {
  const Stack = createStackNavigator();

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  React.useEffect(() => {
    const pressMovement = navigation.addListener('tabPress', (e) => {
      e.preventDefault();
      navigation.jumpTo('Home');
    });

    return pressMovement;
  }, [navigation]);
  
  return (  
    <Stack.Navigator screenOptions={{
      headerShown: false,
      cardStyleInterpolator: forFade,
   }}>
        <Stack.Screen options={{headerShown:false}} name="HowDoYouFeel" component={HowDoYouFeel} />
        <Stack.Screen options={{headerShown: false}} name="CurrentEmotion" component={CurrentEmotion} />
        <Stack.Screen options={{headerShown:false}} name="Start" component={Start} />
        <Stack.Screen options={{headerShown: false}} name="CareToElaborate" component={CareToElaborate} />
        <Stack.Screen options={{headerShown: false}} name="ChooseMotion" component={ChooseMotion} />
        <Stack.Screen options={{headerShown: false}} name="DuringMotion" component={DuringMotion} />
    </Stack.Navigator>
  );
}