import { StyleSheet, Text, View, Image, FlatList, Dimensions } from 'react-native';
import motionData from '../utils/motionData';
import MotionSuggestion from './MotionSuggestion';


function getMotions(motionData, currentFeelings){
  let motions = {};
    for (let i = 0; i < motionData.length; i++) {
      let motion = motionData[i];
      for (let j = 0; j < currentFeelings.length; j++) {
        let pos = motion['feelings'].indexOf(currentFeelings[j]);
        if (pos !== -1){
          if (motion['name'] in motions) {
            motions[motion['name']].push(currentFeelings[j]);
          }
          else {
            motions[motion['name']] = [currentFeelings[j]];
          }
        }
      }
    }
  let motionList = [];
  for (const motion in motions) {
    motionList.push({
      name: motion,
      feelings: motions[motion],
      key: motion
    });
  }
  return motionList;
}

const renderMotionSuggestion = ({ item, index }) => (
  <MotionSuggestion
    name = {item.name}
    feelings= {item.feelings}
  />
);


export default function SuggestedMotions({ currentFeelings }) {
  const motions = getMotions(motionData, currentFeelings);
  return (
    <View style={styles.container}>
      <FlatList
        data={motions}
        renderItem={(item) => renderMotionSuggestion(item)}
        keyExtractor={(item) => item.id} />
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
  }
});