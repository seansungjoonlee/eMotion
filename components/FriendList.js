import { StyleSheet, LayoutAnimation, Text, View, Image, FlatList, Pressable, Dimensions, NativeModules } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import FeelingContext from './FeelingContext';
import { useContext, useState } from 'react';

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


export default function FriendList() {
  const context = useContext(FeelingContext);
  const [updated, setUpdated] = useState(context.contacts);


  const removeItem = (id) => {
    let arr = updated.filter(function(item) {
      return item.id !== id
    })
    setUpdated(arr);
    LayoutAnimation.configureNext(layoutAnimConfig)
  };


  function Friend({name, username, id}) { 
    return (
      <GestureRecognizer style={styles.contactBox} onSwipeLeft={() => {
        context.removeFriend(name, username);
        removeItem(id);
      }}>
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
      id = {item.id}
    />
  );


  return (
    <View style={styles.container}>
      <FlatList
        data={context.friends}
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
    fontFamily: 'Avenir',
    fontSize: SCREEN_HEIGHT * 0.03,
  },
  usernameText: {
    fontFamily: 'Avenir',
    fontSize: SCREEN_HEIGHT * 0.0225
  }
});