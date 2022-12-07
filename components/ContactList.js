import { StyleSheet, Text, View, Image, FlatList, Pressable, Dimensions, NativeModules } from 'react-native';
import motionData from '../utils/motionData';
import MotionSuggestion from './MotionSuggestion';
import Emotion from './Emotion';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 
import AddFriend from '../screens/AddFriend';
import contactsData from '../utils/contactsData';




function Contact({name, username}) {
  return (
    <Pressable style={styles.contactBox} onPress={() => {
      addFriend(name, username);
      console.log(name);
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

function addFriend(name, username) {
  let contact = {};
  contact.name = name;
  contact.username = username;
  for (let i = 0; i < contactsData.length; i++) {
    if (contactsData[i].name == name) {
      contactsData.splice(i, 1);
      console.log(i);
    }
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


export default function ContactList({ contacts }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={(item) => renderContact(item)}
        keyExtractor={(item, index) => {
          return item.id;
        }} 
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
