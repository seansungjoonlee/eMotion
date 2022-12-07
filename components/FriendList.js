import { StyleSheet, Text, View, Image, FlatList, Pressable, Dimensions } from 'react-native';
import motionData from '../utils/motionData';
import MotionSuggestion from './MotionSuggestion';
import Emotion from './Emotion';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';



function Friend({name, username}) {
  return (
    <GestureRecognizer style={styles.contactBox} onSwipeLeft={() => console.log("swiped")}>
        <View style={styles.user}>
            <Text style={styles.nameText}>
                {name}
            </Text>
            <Text style={styles.usernameText}>
                {username}
            </Text>
        </View>
    </GestureRecognizer>
  );
}


const renderFriend = ({ item, index }) => (
  <Friend
    name = {item.name}
    username = {item.username}
  />
);


export default function FriendList({ friends }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        renderItem={(item) => renderFriend(item)}
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