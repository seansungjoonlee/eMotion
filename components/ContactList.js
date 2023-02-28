import { StyleSheet, LayoutAnimation, UIManager, Text, View, Image, FlatList, Pressable, Dimensions, NativeModules } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import contactsData from '../utils/contactsData';
import FeelingContext from './FeelingContext';
import { useContext } from 'react';
import React from 'react';
import { useState } from 'react';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

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
    width: SCREEN_WIDTH * 0.75,
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
    // fontFamily: 'Avenir',
    fontSize: SCREEN_HEIGHT * 0.03,
  },
  usernameText: {
    // fontFamily: 'Avenir',
    fontSize: SCREEN_HEIGHT * 0.0225
  }
});
