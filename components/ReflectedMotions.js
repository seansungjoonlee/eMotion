import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import motionData from '../utils/motionData';
import MotionSuggestion from './MotionSuggestion';
import Emotion from './Emotion';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useNavigation } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';


function PastMotion({name, motionFeelings, date, fullNames}) {
  const navigator = useNavigation();
  return (
    <View style={styles.motion}>
          <Pressable onPress={() => navigator.navigate('ExerciseOverview', { date: date, name: name, fullNames: fullNames})}>
          <Pressable style={styles.scrollable} onPress={() => navigator.navigate('ExerciseOverview', { date: date, name: name, fullNames: fullNames})}>
            <FlatList
              data={motionFeelings}
              horizontal={true}
              scrollEnabled={true}
              nestedScrollEnabled={true}
              renderItem={({ item }) => (
                  <Pressable onPress={() => navigator.navigate('ExerciseOverview', { date: date, name: name, fullNames: fullNames})}>
                      <View style={styles.emotionBox}>
                          <Emotion feelings={item}/>
                      </View>
                  </Pressable>
              )}
              ListHeaderComponent={
                <Text style={styles.name}>
                  {name}
                </Text>
              }
              ListHeaderComponentStyle={{justifyContent: 'center', alignItems: 'center'}}
              />
            </Pressable>
            </Pressable>
    </View>
  );
}


const renderMotion = ({ item, index }) => (
  <PastMotion
    name = {item.name}
    motionFeelings = {item.feelings}
    date = {item.date}
    fullNames = {item.fullNames}
  />
);

function configureMotions(movement) {
  const motionEntry = movement.motionEntry;
  let motionsData = [];
  motionsData.push({name: motionEntry[0].name.substring(0, motionEntry[0].name.length-2), feelings: [motionEntry[0].feelings], fullNames:[motionEntry[0].name], date: movement.dateEntry})
  for (let i = 1; i < motionEntry.length; i++) {
    if (motionEntry[i].name.substring(0, motionEntry[i].name.length-2) !== motionsData[motionsData.length-1].name) {
      motionsData.push({name: motionEntry[i].name.substring(0, motionEntry[i].name.length-2), feelings: [motionEntry[i].feelings], fullNames: [motionEntry[i].name], date: movement.dateEntry});
    } else {
      motionsData[motionsData.length-1].feelings.push(motionEntry[i].feelings);
      motionsData[motionsData.length-1].fullNames.push(motionEntry[i].name);
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
        scrollEnabled={true}
        nestedScrollEnabled={true}
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
  scrollable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  motion: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    width: 250,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
},
emotions: {
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center'
},
name: {
    fontFamily: 'Avenir',
    fontSize: 20,
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
},
emotionList: {
  height: 60
},
border: {
  flexDirection: 'row',
  borderWidth: 1
}
});