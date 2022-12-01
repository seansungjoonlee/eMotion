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
import ReflectionTask from './components/ReflectionTask';
import CommunityTask from './components/CommunityTask';
import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native"; 
import { useNavigation } from './node_modules/@react-navigation/native';


export default function App() {
  const Tab = createBottomTabNavigator();
  const [currentFeelings, setCurrentFeelings] = useState([]);
  const [basic, setBasic] = useState([]);
  const [secondary, setSecondary] = useState([]);
  const [motion, setMotion] = useState({name:'', feelings:[]});

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  function updateSecondary(newBasic) {
    let updated = [];
    for (let i = 0; i < newBasic.length; i++) {
      for (let j = 0; j < basicToSecondary[newBasic[i]].length; j++) {
        if (secondary.indexOf(basicToSecondary[newBasic[i]][j]) !== -1) {
          updated.push(basicToSecondary[newBasic[i]][j]);
        }
      }
    }
    setSecondary(updated);
  }

  function getCurrentMovementIndex() {
    for (let i = 0; i < movementData.length; i++) {
      if (movementData[i].dateEntry === date) {
        return i
      }
    }
    return -1
  }

  function updateCurrentFeelings() {
    let updated = [];
    for (let i = 0; i < basic.length; i++) {
      //basic feeling
      updated.push(basic[i]);
    }
    
    for (let i = 0; i < secondary.length; i++) {
      //basic feeling
      updated.push(secondary[i]);
    }

    setCurrentFeelings(updated);
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

  //returns the names of all motions stored in a given movement
  function movementNames(term) {
    let names = [];
    for (let i = 0; i < term.motionEntry.length; i++) {
      names.push(term.motionEntry[i].name);
    }
    return names;
  }

  function getFeelingsDate(date) {
    for (let i = 0; i < movementData.length; i++) {
      if (movementData[i].dateEntry === date) {
        const movement = movementData[i];
        let feelings = [];
        for (let i = 0; i < movement.motionEntry.length; i++) {
          let set = movement.motionEntry[i]['feelings'];
          for (let j = 0; j < set.length; j++) {
            feelings.push(set[j]);
          }
        }
      return feelings;
      }
    }
    return [];
  }

  function movementFeelings(term) {
    let feelings = [];
    for (let i = 0; i < term.motionEntry.length; i++) {
      feelings.push(term.motionEntry[i].feelings);
    }
    return feelings;
  }

  function updateMovement(name, feelings) {
    let newMotion = {};
    newMotion.name = name;
    newMotion.feelings = feelings;
    if (getCurrentMovementIndex() !== -1) {
      movementData[getCurrentMovementIndex()].motionEntry.push(newMotion);
      // for(let i = 0; i < movementData[movementData.length - 1].motionEntry.length; i++) {
      //   console.log("motion name at index " + i + " " + movementData[movementData.length - 1].motionEntry[i].name);
      // }
    } else {
      let movementEntry = {};
      movementEntry.dateEntry = date;
      movementEntry.motionEntry = [];
      movementEntry.motionEntry.push(newMotion);
      movementData.push(movementEntry);
      //will this console log work when motionEntry is an array? check after hardcoding movements
    }

  }

  const feelingSettings = {
    basic: basic,
    setBasic: setBasic,
    secondary: secondary,
    setSecondary: setSecondary,
    updateSecondary: updateSecondary,
    currentFeelings: currentFeelings,
    updateCurrentFeelings: updateCurrentFeelings,
    motion: motion,
    updateMotion: updateMotion,
    updateMovement: updateMovement,
    movementFeelings: movementFeelings,
    getFeelingsDate: getFeelingsDate,
    getCurrentMovementIndex: getCurrentMovementIndex
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
            } else if (route.name === 'Community') {
              iconName = 'users';
              size = focused ? 30: 20;
            }
            return <FontAwesome name={iconName} size={size} color="black" />;
          }
        })}>

          <Tab.Screen options={{headerShown:false}} name="Reflection" component={ReflectionTask} />
          <Tab.Screen options={{headerShown:false}} name="Movement" component={MainTask} />
          <Tab.Screen options={{headerShown:false}} name="Community" component={CommunityTask} />
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
