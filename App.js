import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer, NavigationHelpersContext } from './node_modules/@react-navigation/native';
import React from 'react';
import FeelingContext from './components/FeelingContext';
import { useState } from 'react';
import { basicFeelings, basicToSecondary, colorMapping } from './assets/feelings.js';
import Themes from './assets/Themes.js';
import MainTask from './components/MainTask';
import movementData from './utils/movementData';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Reflection from './components/Reflection';
import Shared from './components/Shared';
import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native"; 
import { useNavigation } from './node_modules/@react-navigation/native';


export default function App() {
  const Tab = createBottomTabNavigator();
  const [allFeelings, setAllFeelings] = useState([]);
  const [currentFeelings, setCurrentFeelings] = useState([]);
  const [newFeelings, setNewFeelings] = useState({basic:[], secondary:[]});
  const [basic, setBasic] = useState([]);
  const [motion, setMotion] = useState({name:'', feelings:[]});

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

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

    if(name != "choosing" && name != '') {
      console.log("inside if statement++++++++++");
      console.log("updated.name = " + updated.name);
      updateMovement(updated);
    }
    

    setMotion(updated);
  }

  function updateMovement(newMotion) {
    console.log("newMotion = " + newMotion.name + newMotion.feelings);
    console.log("movementData length: " + movementData.length);
    if ((movementData.length != 0 ) && (movementData[movementData.length - 1].dateEntry == date)) {
      console.log("movement data is populated, most recent date is: " + movementData[movementData.length-1].dateEntry);
      movementData[movementData.length - 1].motionEntry.push(newMotion);
      for(let i = 0; i < movementData[movementData.length - 1].motionEntry.length; i++) {
        console.log("motion name at index " + i + " " + movementData[movementData.length - 1].motionEntry[i].name);
      }
      
    } else {
      let movementEntry = {};
      movementEntry.dateEntry = date;
      movementEntry.motionEntry = [];
      movementEntry.motionEntry.push(newMotion);
      console.log("inside if statement: ****** " + movementEntry.dateEntry + movementEntry.motionEntry.name);
      movementData.push(movementEntry);
      console.log("movementData[0] feelings: " + movementData[3].motionEntry.feelings);
    }

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
      <NavigationContainer>
        <Tab.Navigator initialRouteName={'Movement'} tabBarOptions={{
          labelStyle: { fontSize: 14 },
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            let size;
            if (route.name === 'Reflection') {
              iconName = 'user';
              size = focused ? 30: 20;
            } else if (route.name === 'Movement') {
              iconName = 'dot-circle-o';
              size = focused ? 30: 20;
            } else if (route.name === 'Shared') {
              iconName = 'users';
              size = focused ? 30: 20;
            }
            return <FontAwesome name={iconName} size={size} color="black" />;
          }
        })}>

          <Tab.Screen options={{headerShown:false}} name="Reflection" component={Reflection} />
          <Tab.Screen options={{headerShown:false}} name="Movement" component={MainTask} />
          <Tab.Screen options={{headerShown:false}} name="Shared" component={Shared} />
        </Tab.Navigator>
      </NavigationContainer>
    </FeelingContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.background,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    borderWidth: 3,
    borderColor: 'red'
  },
});
