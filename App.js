import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Start from './screens/Start';
import HowDoYouFeel from './screens/HowDoYouFeel';
import CareToElaborate from './screens/CareToElaborate';
import { NavigationContainer } from './node_modules/@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DuringMotion from './screens/DuringMotion';
import ChooseMotion from './screens/ChooseMotion';
import CurrentEmotion from './screens/CurrentEmotion';
import React from 'react';
import FeelingContext from './components/FeelingContext';
import { useState } from 'react';
import { basicFeelings, basicToSecondary, colorMapping } from './assets/feelings.js';


export default function App() {
  const Stack = createStackNavigator();

  const [allFeelings, setAllFeelings] = useState([]);
const [currentFeelings, setCurrentFeelings] = useState([]);
const [newFeelings, setNewFeelings] = useState({basic:[], secondary:[]});
const [basic, setBasic] = useState([]);
const [motion, setMotion] = useState({name:'', feelings:[]});

function updateAllFeelings(feelings) {
let updated = [...allFeelings];
for (let i = 0; i < feelings.length; i++) {
    if (updated.indexOf(feelings[i]) === -1) {
    updated.push(feelings[i]);
    }
}
setAllFeelings(updated);
}

function updateNewFeelings(feelings) {
let updated = {...newFeelings};
for (let i = 0; i < feelings.length; i++) {
    //basic feeling
    if (basicFeelings.indexOf(feelings[i]) !== -1) {
    if (updated.basic.indexOf(feelings[i]) === -1) {
        updated.basic.push(feelings[i]);
    }
    }
    //secondary feeling
    else {
    if (updated.secondary.indexOf(feelings[i]) === -1) {
        updated.secondary.push(feelings[i]);
    }
    }
}
setNewFeelings(updated);
}

function updateMotion(name, feelings) {
let updated = {};
if (motion.name !== name) {
    updated.name = name;
    updated.feelings = feelings;
} else {
    updated = {...motion};
    for (let i = 0; i < feelings.length; i++) {
    if (motion.feelings.indexOf(feelings[i]) === -1) {
        updated.feelings.push(feelings[i]);
    }
    }
}
setMotion(updated);
}

  const feelingSettings = {
    allFeelings: allFeelings,
    updateAllFeelings: updateAllFeelings,
    currentFeelings: currentFeelings,
    setCurrentFeelings: setCurrentFeelings,
    motion: motion,
    updateMotion: updateMotion,
    newFeelings: newFeelings,
    updateNewFeelings: updateNewFeelings,
    basic: basic,
    setBasic: setBasic
  };
  
  return (  
    <FeelingContext.Provider value={feelingSettings}>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown:false}} name="Start" component={Start} />
          <Stack.Screen options={{headerShown:false}} name="HowDoYouFeel" component={HowDoYouFeel} />
          <Stack.Screen options={{headerShown: true}} name="CareToElaborate" component={CareToElaborate} />
          <Stack.Screen options={{headerShown: false}} name="CurrentEmotion" component={CurrentEmotion} />
          <Stack.Screen options={{headerShown: true}} name="ChooseMotion" component={ChooseMotion} />
          <Stack.Screen options={{headerShown: false}} name="DuringMotion" component={DuringMotion} />
        </Stack.Navigator>
      </NavigationContainer>
    </FeelingContext.Provider>
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
