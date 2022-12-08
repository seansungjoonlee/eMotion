import { StyleSheet, Text, View, Image, FlatList, Dimensions } from 'react-native';
import motionData from '../utils/motionData';
import MotionSuggestion from './MotionSuggestion';
import Emotion from './Emotion';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import { useState } from 'react';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');


function Notif({friend, message}) {
    const header = 'You and ' + friend + '...';
    const [heart, setHeart] = useState('heart-outline')
    const [color, setColor] = useState('black')

    function toggleHeart() {
        if (heart === 'heart-outline') {
            setHeart('heart-sharp')
            setColor('red')
        } else {
            setHeart('heart-outline')
            setColor('black')
        }
    }

  return (
    <View style={styles.notif}>
        <View style={styles.notifTop}>
            <Text style={styles.header}>
                {header}
            </Text>
            <Ionicons name={heart} size={SCREEN_HEIGHT * 0.036} color={color} onPress={() => toggleHeart()}/>
        </View>
         <Text style={styles.body}>
            {message}
        </Text>
    </View>
  );
}


const renderNotif = ({ item, index }) => (
  <Notif
    friend = {item.friend}
    message= {item.message}
  />
);


export default function FeedList({ notifs }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={notifs}
        renderItem={(item) => renderNotif(item)}
        keyExtractor={(item, index) => {
          return item.id;
        }}
        ListFooterComponent={() => (
        <View style={styles.footer}>
            <Text style={styles.footerText}>
                That's all for today.
            </Text>
            <Text style={styles.footerText}>
                Add more friends to see more
            </Text>
            <Text style={styles.footerText}>
                similarities!
            </Text>
            
        </View>
        )}
        ListFooterComponentStyle={{justifyContent: 'center', alignItems: 'center'}}
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
   notif: {
    width: SCREEN_WIDTH * 0.8,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'center',
    padding: 10
  },
  header: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: SCREEN_HEIGHT * 0.03,
    marginBottom: '4%'
  },
  body: {
    fontFamily: 'Avenir',
    fontSize: SCREEN_HEIGHT * 0.0225
  },
  footer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '5%'
  },
  footerText: {
    fontFamily: 'Avenir',
    fontSize: SCREEN_HEIGHT * 0.0225
  },
  notifTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  }
});