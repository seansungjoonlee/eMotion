import { StyleSheet, LayoutAnimation, UIManager, Text, View, Image, FlatList, Pressable, Dimensions, NativeModules } from 'react-native';
import motionData from '../utils/motionData';
import MotionSuggestion from './MotionSuggestion';
import Emotion from './Emotion';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 
import AddFriend from '../screens/AddFriend';
import contactsData from '../utils/contactsData';
import friendsData from '../utils/friendsData';
import FeelingContext from './FeelingContext';
import { useContext } from 'react';
import React from 'react';
import { useState } from 'react';

function removeFriend(name, username) {
  let friend = {};
  friend.name = name;
  friend.username = username;
  contactsData.push(friend);
  for (let i = 0; i < friendsData.length; i++) {
    if (friendsData[i].name == name) {
      friendsData.splice(i, 1);
    }
  }
}

const layoutAnimConfig = {
  duration: 300,
  update: {
    type: LayoutAnimation.Types.easeInEaseOut, 
  },
  delete: {
    duration: 100,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};



export default function ContactList({ contacts }) {
  const context = useContext(FeelingContext);
  const [updated, setUpdated] = useState(context.contacts);

  const removeItem = (id) => {
    let arr = updated.filter(function(item) {
      return item.id !== id
    })
    setUpdated(arr);
    LayoutAnimation.configureNext(layoutAnimConfig)
  };


  function Contact({name, username, id}) {
    const context = useContext(FeelingContext);
  
    return (
      <Pressable style={styles.contactBox} onPress={() => {
        context.addFriend(name, username);
        removeItem(id)
        }}>
          <View style={styles.user}>
              <Text style={styles.nameText}>
                  {name}
              </Text>
              <Text style={styles.usernameText}>
                  {username}
              </Text>
          </View>
          <MaterialIcons name="add" size={24} color="black" />
      </Pressable>
    );
  }
  console.log(contactsData);
  //console.log("name is " + name);
}


const renderContact = ({ item, index }) => (
  <Contact
    name = {item.name}
    username = {item.username}
  />
);


  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={(item) => renderContact(item)}
        keyExtractor={(item, index) => {
          return item.id;
        }} 
        extraData={updated}
        />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    width: 270,
    padding: 10,
    marginTop: 10,
    borderRadius: 15
  },
  user: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  nameText: {
    fontFamily: 'Avenir',
    fontSize: 20,
  },
  usernameText: {
    fontFamily: 'Avenir',
    fontSize: 15
  }
});
