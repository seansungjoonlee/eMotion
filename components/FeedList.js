import { StyleSheet, Text, View, Image, FlatList, Dimensions } from 'react-native';
import motionData from '../utils/motionData';
import MotionSuggestion from './MotionSuggestion';
import Emotion from './Emotion';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useNavigation } from '@react-navigation/native';


function Notif({friend, message}) {
    const header = 'You and ' + friend + '...';
  return (
    <View style={styles.notif}>
        <Text style={styles.header}>
            {header}
        </Text>
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


export default function FeedList() {

    const notifs = [{friend: "Devorah", message:'...both felt anxious and sad tonight. Try comforting each other.'}, {friend: "Ethan", message:'...both logged squats today. High five!'}, {friend: 'Hawi', message: '...both logged yoga today. Namaste!'}]
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
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'center',
    padding: 10
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10
  },
  body: {
    fontSize: 15
  },
  footer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 15
  },
  footerText: {
    fontSize: 15
  }
});