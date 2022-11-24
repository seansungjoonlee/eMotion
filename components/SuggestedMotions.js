import { StyleSheet, Text, View, Image, FlatList, Dimensions } from 'react-native';
import motionData from '../utils/motionData';
import MotionSuggestion from './MotionSuggestion';


function getMotions(motionData, currentFeelings, setBasic, setSecondary){
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
      motionFeelings: motions[motion],
      allFeelings: currentFeelings,
      key: motion,
      setBasic: setBasic,
      setSecondary: setSecondary
    });
  }
  return motionList;
}

const renderMotionSuggestion = ({ item, index }) => (
  <MotionSuggestion
    name = {item.name}
    motionFeelings = {item.motionFeelings}
    allFeelings = {item.allFeelings}
    setBasic={item.setBasic}
    setSecondary={item.setSecondary}
  />
);


export default function SuggestedMotions({ currentFeelings, setBasic, setSecondary }) {
  const motions = getMotions(motionData, currentFeelings, setBasic, setSecondary);
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