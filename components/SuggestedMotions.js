// import { StyleSheet, Text, View, Image, FlatList, Dimensions } from 'react-native';
// import motionData from '../utils/motionData';
// import MotionSuggestion from './MotionSuggestion';


// function getMotions(motionData, currentFeelings){
//   let motions = {};
//     for (let i = 0; i < motionData.length; i++) {
//       let motion = motionData[i];
//       for (let j = 0; j < currentFeelings.length; j++) {
//         let pos = motion['feelings'].indexOf(currentFeelings[j]);
//         if (pos !== -1){
//           if (motion['name'] in motions) {
//             motions[motion['name']].push(currentFeelings[j]);
//           }
//           else {
//             motions[motion['name']] = [currentFeelings[j]];
//           }
//         }
//       }
//     }
//   let motionList = [];
//   for (const motion in motions) {
//     motionList.push({
//       name: motion,
//       motionFeelings: motions[motion],
//     });
//   }
//   return motionList;
// }

// const renderMotionSuggestion = ({ item, index }) => (
//   <MotionSuggestion
//     name = {item.name}
//     motionFeelings = {item.motionFeelings}
//   />
// );


// export default function SuggestedMotions({ currentFeelings }) {

//   const motions = getMotions(motionData, currentFeelings);
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={motions}
//         renderItem={(item) => renderMotionSuggestion(item)}
//         keyExtractor={(item, index) => {
//           return item.id;
//         }} />
//     </View>
//   )
// }


// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//     width: '100%',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });

import { StyleSheet, Text, View, Image, FlatList, Dimensions } from 'react-native';
import motionData from '../utils/motionData';
import MotionSuggestion from './MotionSuggestion';

//new database format:

//"sandwich" format:
    //start feeling
        //name of movement, end feeling(s)

    //for example
    //tired
        //tennis with ethan, [energetic, happy, powerful]
        //yoga, [calm, powerful]
    //happy
        //kickball, [annoyed, angry]
        //walk down palm drive, [calm, happy]

//movement association format: what the new motionData looks like; sorted by instance - for suggestions
    //name of feeling
        //movement name, instance
    
    //for example:
    //happy
        //tennis with ethan, 5
        //walk down palm drive, 3
    //sad
        //yoga, 4
        //walk down university ave, 2

function getMotions(motionData, currentFeelings){
    let motions = {};
    let suggestions = [[]]; //sparse 2D array, index indicates instance (so later in the array is higher association)
    for (let i = 0; i < currentFeelings.length; i++) { //for every feeling that the user feels right now, get matching movements
        let currentFeeling = currentFeelings[i];
        let associatedMovements = motionData.currentFeeling; //does this work? associatedMovements is now an object containing movement key and instance value
        for (const movement in associatedMovements) {
            let suggestion = {};
            suggestion.movementName = movement;
            suggestion.feeling = currentFeeling;
            let index = associatedMovements[movement];
            suggestions[index].push(suggestion);
        }
    }
    //suggestions is now populated in reverse order of all movements associated with feelings (higher index = stronger association)
    //TODO: some math so that indices can add if a movement is associated with multiple feelings
    for (let i = suggestions.length - 1; i > -1; i--) {
        for (let j = 0; j < suggestions[i].length; j++) {
            if (suggestions[i][j].movementName in motions) {
                motions[suggestions[i][j].movementName].push(suggestions[i][j].feeling);
            } else {
                motions[suggestions[i][j].movementName] = [suggestions[i][j].feeling];
            }
        }
    }
    let motionList = [];
    for (const motion in motions) {
    motionList.push({
        name: motion,
        motionFeelings: motions[motion],
    });
    }
    return motionList;
}

const renderMotionSuggestion = ({ item, index }) => (
    <MotionSuggestion
    name = {item.name}
    motionFeelings = {item.motionFeelings}
    />
);


export default function SuggestedMotions({ currentFeelings }) {

    const motions = getMotions(motionData, currentFeelings);
    return (
    <View style={styles.container}>
        <FlatList
        data={motions}
        renderItem={(item) => renderMotionSuggestion(item)}
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
    }
});
