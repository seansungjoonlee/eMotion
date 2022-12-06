import { StyleSheet, Text, View, Image, FlatList, Pressable, Dimensions } from 'react-native';
import motionData from '../utils/motionData';
import MotionSuggestion from './MotionSuggestion';
import Emotion from './Emotion';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 



function Contact({name, username}) {
  return (
    <Pressable style={styles.contactBox}>
        <View style={styles.user}>
            <Text>
                {name}
            </Text>
            <Text>
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
});