import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer, NavigationHelpersContext } from './node_modules/@react-navigation/native';
import React from 'react';
import FeelingContext from './components/FeelingContext';
import { useState } from 'react';
import { basicFeelings, basicToSecondary, basicColorMapping, mapAllColors } from './assets/feelings.js';
import Themes from './assets/Themes.js';
import MainTask from './components/MainTask';
import hardcodedMovementData from './utils/movementData';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ReflectionTask from './components/ReflectionTask';
import CommunityTask from './components/CommunityTask';
import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native"; 
import { useNavigation } from './node_modules/@react-navigation/native';
import context from 'react-context';


export default function App() {
  const Tab = createBottomTabNavigator();
  const [currentFeelings, setCurrentFeelings] = useState([]);
  const [basic, setBasic] = useState([]);
  const [secondary, setSecondary] = useState([]);
  const [motion, setMotion] = useState({name:'', feelings:[], note:""});
  const [movementData, setMovementData] = useState(hardcodedMovementData);
  const [basicMapping, setBasicMapping] = useState(basicColorMapping);
  const [colorMapping, setColorMapping] = useState(mapAllColors(basicColorMapping));

  const current = new Date();
  const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;

  function updateColorMapping(basicFeeling, newColor) {
    let updated = {...basicMapping};
    updated[basicFeeling] = newColor;
    console.log(newColor);
    setBasicMapping(updated);
    setColorMapping(mapAllColors(updated));
  }
  
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

  async function updateCurrentFeelings(bas, sec) {
    let updated = [];
    for (let i = 0; i < bas.length; i++) {
      //basic feeling
      updated.push(bas[i]);
    }
    
    for (let i = 0; i < sec.length; i++) {
      //basic feeling
      updated.push(sec[i]);
    }
    setCurrentFeelings(updated);
    //setCurrentFeelings(updated);

  }


  function editNote(status, movementDate, motionName, text) {
    if (status === 'motion') {
      for (let i = 0; i < movementData.length; i++) {
        if (movementData[i].dateEntry === movementDate) {
          console.log('found movement')
          for (let j = movementData[i].motionEntry.length - 1; j >= 0; j--) {
              if (movementData[i].motionEntry[j].name.substring(0, movementData[i].motionEntry[j].name.length-2) === motionName) {
                while (movementData[i].motionEntry[j-1].name.substring(0, movementData[i].motionEntry[j-1].name.length-2) === motionName) {
                  j -= 1
                }
                console.log('found motion')
                let updated = [...movementData];
                updated[i].motionEntry[j].note = text;
                setMovementData(updated);
              }
          }
        }
      }
    } else {
      for (let i = 0; i < movementData.length; i++) {
        if (movementData[i].dateEntry === movementDate) {
          console.log('found movement')
          for (let j = 0; j < movementData[i].motionEntry.length; j++) {
              if (movementData[i].motionEntry[j].name === motionName) {
                console.log('found motion')
                let updated = [...movementData];
                updated[i].motionEntry[j].note = text;
                setMovementData(updated);
                console.log('updated motion');
              }
          }
        }
      }
    }
  }

  function editMotionFromReflection(movementDate, motionName, newFeelings) {
    for (let i = 0; i < movementData.length; i++) {
      if (movementData[i].dateEntry === movementDate) {
        for (let j = 0; j < movementData[i].motionEntry.length; j++) {
            if (movementData[i].motionEntry[j].name === motionName) {
              let updated = [...movementData];
              updated[i].motionEntry[j].feelings = newFeelings;
              setMovementData(updated);
            }
        }
      }
    }
  }

  function getTime() {
    let newDate = new Date();
    let time = newDate.getHours();
    if(newDate.getMinutes() < 10) {
      time += ':0' + newDate.getMinutes();
    } else {
      time += ':' + newDate.getMinutes();
    }
    console.log("time is now " + time);
    return time;
  }

  function updateMotion(name, feelings) {
    let updated = {};
    if (motion.name !== name) {
      updated.name = name;
      updated.feelings = feelings;
      updated.note = "";

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

  function getMovement(date) {
    for (let i = 0; i < movementData.length; i++) {
      if (movementData[i].dateEntry === date) {
        return movementData[i];
      }
    }
    return -1;
  }

  function movementFeelings(term) {
    let feelings = [];
    for (let i = 0; i < term.motionEntry.length; i++) {
      feelings.push(term.motionEntry[i].feelings);
    }
    return feelings;
  }

  function updateMovement(name, feelings, movementDate) {
    let updated = [...movementData];

    if (name == "") {
      name = getTime();
    }
    let newMotion = {};
    //add a number to the motion name
    
    newMotion.name = name;
    newMotion.feelings = feelings;
    console.log(newMotion);
    newMotion.note = "";
    //if >=one motion for today has already been logged
    let movementIndex = -1;
    if (movementDate === date) {
      movementIndex = getCurrentMovementIndex();
    } else {
      for (let i = 0; i < movementData.length; i++) {
        if (movementData[i].dateEntry === movementDate) {
          movementIndex = i;
        }
      }
    }
    if (movementIndex !== -1) {
      //add the correct number to the motion name
      let count = 1;
      for (let i = 0; i < movementData[movementIndex].motionEntry.length; i++) {
        if (movementData[movementIndex].motionEntry[i].name == (name + " " + count)) {
          count++;
        }
      }
      newMotion.name += " " + count;
      updated[movementIndex].motionEntry.push(newMotion);
      console.log('changed')
      setMovementData(updated);
    } else {
      //newMotion name will be the first one, no need to loop
      newMotion.name += " 1";
      let movementEntry = {};
      movementEntry.dateEntry = movementDate;
      movementEntry.motionEntry = [];
      movementEntry.motionEntry.push(newMotion);
      updated.push(movementEntry);
      setMovementData(updated);
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
    getCurrentMovementIndex: getCurrentMovementIndex,
    getMovement: getMovement,
    movementData: movementData,
    date: date,
    editNote: editNote,
    editMotionFromReflection: editMotionFromReflection,
    colorMapping: colorMapping,
    updateColorMapping: updateColorMapping
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
