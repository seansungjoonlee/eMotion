import { StyleSheet, Text, View, Image, FlatList, Dimensions } from 'react-native';
import motionData from '../utils/motionData';
import MotionSuggestion from './MotionSuggestion';
import Emotion from './Emotion';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useNavigation } from '@react-navigation/native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');


function Feeling({feeling}) {
  return (
    <View style={styles.log}>
         <Text style={styles.feeling}>
            {feeling}
        </Text>
    </View>
  );
}


const renderMotion = ({ item, index }) => (
  <Feeling
    feeling = {item}
  />
);


export default function EmotionList({ feelings }) {

  return (
    <View style={styles.container}>
      <FlatList
        data={feelings}
        renderItem={(item) => renderMotion(item)}
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
  log: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  feeling: {
    fontSize: SCREEN_HEIGHT * 0.03
  },
});