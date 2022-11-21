import { StyleSheet, Text, View } from 'react-native';
import Emotion from './components/Emotion';
import BasicSelection from './components/BasicSelection';
import SecondSelection from './components/SecondSelection';

let currentFeelings = ["joyful", "anxious", "angry", "sad", "surprised"];
const colorMapping = {
  "joyful": "#FFF27A",
  "anxious":"#FF7A8C",
  "angry":"#CA7AFF",
  "sad":"#7AFF8C",
  "surprised":"#FFA07A"
};

export default function App() {
  return (
    <View style={styles.container}>
      <SecondSelection colorMapping={colorMapping} currentFeelings={['joyful', 'surprised']}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    width:'100%'
  },
});
