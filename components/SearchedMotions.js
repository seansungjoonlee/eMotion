import { StyleSheet, Text, View, Image, FlatList, Dimensions } from 'react-native';
import motionData from '../utils/motionData';
import MotionsSearched from './MotionsSearched';


function getMotions(motionData, searched){
  let motionList = [];
  if (searched === '') {
    return motionList;
  }
    for (let i = 0; i < motionData.length; i++) {
      let motionName = motionData[i].name;
      if (motionName.includes(searched)) {
        motionList.push({
            name: motionName
        })
      }
    }
  return motionList;
}

const renderMotionsSearched = ({ item, index }) => (
  <MotionsSearched
    name = {item.name}
    key={index}
  />
);


export default function SearchedMotions({ searched }) {
    searched = searched.toLowerCase();
    const motions = getMotions(motionData, searched);
    return (
        <View style={styles.container}>
            <FlatList
                data={motions}
                renderItem={(item) => renderMotionsSearched(item)}
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