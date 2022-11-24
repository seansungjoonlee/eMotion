import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Start from './screens/Start';
import HowDoYouFeel from './screens/HowDoYouFeel';
import CareToElaborate from './screens/CareToElaborate';
import { NavigationContainer } from './node_modules/@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DuringMotion from './screens/DuringMotion';
import ChooseMotion from './screens/ChooseMotion';
import CurrentEmotion from './screens/CurrentEmotion';
import HowDoYouFeelMotion from './screens/HowDoYouFeelMotion';
import CareToElaborateMotion from './screens/CareToElaborateMotion';
import React from 'react';

export default function App() {
  const Stack = createStackNavigator();


  return (  
      <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown:false}} name="Start" component={Start} />
          <Stack.Screen options={{headerShown:false}} name="HowDoYouFeel" component={HowDoYouFeel} />
          <Stack.Screen options={{headerShown: false}} name="CareToElaborate" component={CareToElaborate} />
          <Stack.Screen options={{headerShown: false}} name="CurrentEmotion" component={CurrentEmotion} />
          <Stack.Screen name="ChooseMotion" component={ChooseMotion} />
          <Stack.Screen name="DuringMotion" component={DuringMotion} />
          <Stack.Screen options={{headerShown:false}} name="HowDoYouFeelMotion" component={HowDoYouFeelMotion} />
          <Stack.Screen options={{headerShown: false}} name="CareToElaborateMotion" component={CareToElaborateMotion} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    borderWidth: 3,
    borderColor: 'red'
  },
});
