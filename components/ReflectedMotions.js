import { StyleSheet, Text, View, Image, FlatList, Dimensions } from 'react-native';
import motionData from '../utils/motionData';
import MotionSuggestion from './MotionSuggestion';
import Emotion from './Emotion';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useNavigation } from '@react-navigation/native';


function PastMotion({name, motionFeelings, date, note}) {
  const navigator = useNavigation();
  return (
    <Pressable style={styles.motion} onPress={() => navigator.navigate('ExerciseOverview', {feelings: motionFeelings, date: date, name: name, note: note})}>
      <Text style={styles.name}>
        {name}
      </Text>
      <FlatList
            data={motionFeelings}
            horizontal={true}
            renderItem={({ item }) => (
                <View>
                    <View style={styles.emotionBox}>
                        <Emotion feelings={item}/>
                    </View>
                </View>
            )}
            />
    </Pressable>
  );
}


const renderMotion = ({ item, index }) => (
  <PastMotion
    name = {item.name}
    motionFeelings = {item.feelings}
    date = {item.date}
    note = {item.note}
  />
);

function configureMotions(movement) {
  const motionEntry = movement.motionEntry;
  let motionsData = [];
  motionsData.push({name: motionEntry[0].name, feelings: [motionEntry[0].feelings], date: movement.dateEntry, note:motionEntry[0].note})
  for (let i = 1; i < motionEntry.length; i++) {
    if (motionEntry[i].name != motionsData[motionsData.length-1].name) {
      motionsData.push({name: motionEntry[i].name, feelings: [motionEntry[i].feelings], date: movement.dateEntry, note:motionEntry[i].note});
    } else {
      motionsData[motionsData.length-1].feelings.push(motionEntry[i].feelings);
      motionsData[motionsData.length-1].note = motionEntry[i].note;
    }
  }
  return motionsData;
}


export default function ReflectedMotions({ movement }) {
  const motions = configureMotions(movement);
  const date = movement.dateEntry;
  return (
    <View style={styles.container}>
      <FlatList
        data={motions}
        renderItem={(item) => renderMotion(item)}
        keyExtractor={(item, index) => {
          return item.id;
        }} />
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
  motion: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    width: 250,
    marginVertical: 10,
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'center',
    padding: 10
},
emotions: {
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center'
},
name: {
    fontSize: 30,
    paddingHorizontal: 5
},
basedOnText: {
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
},
emotionBox: {
    height: 60,
    width: 60,
    marginHorizontal: 5
}
});