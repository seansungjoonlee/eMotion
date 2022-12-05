import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native';
import motionData from '../utils/motionData';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import FeelingContext from './FeelingContext';



function MotionsSearched({ name, movement }) {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
    return (
        <Pressable style={styles.motion} onPress={() => {navigator.navigate('HowDoYouFeelAddMotion', {status: 'add', name: name, movement: movement})}}>
            <Text style={styles.name}>{name}</Text>
        </Pressable>
    );
}


function getMotions(motionData, searched, movement){
  let motionList = [];
  if (searched === '') {
    return motionList;
  }
    for (let i = 0; i < motionData.length; i++) {
      let motionName = motionData[i].name;
      if (motionName.includes(searched)) {
        motionList.push({
            name: motionName,
            movement: movement
        })
      }
    }
  return motionList;
}

const renderMotionsSearched = ({ item, index }) => (
  <MotionsSearched
    name = {item.name}
    movement={item.movement}
    key={index}
  />
);


export default function SearchedMotionsReflection({ searched, movement }) {
    searched = searched.toLowerCase();
    const motions = getMotions(motionData, searched, movement);
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
  },
  motion: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    width: 275,
    marginVertical: 5,
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'center',
    padding: 10
},
name: {
    fontWeight: 'bold',
    fontSize: 20,
},
});