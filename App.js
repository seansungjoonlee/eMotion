import { StyleSheet, Text, View } from 'react-native';
import Emotion from './components/Emotion';
import BasicSelection from './components/BasicSelection';
import SecondSelection from './components/SecondSelection';
import Start from './app/screens/Start';
import HowDoYouFeel from './app/screens/HowDoYouFeel';
import CareToElaborate from './app/screens/CareToElaborate';
import colorMapping from './assets/feelings';

const mapping = colorMapping;

export default function App() {
  return (
    <View style={styles.container}>
      <Emotion feelings={['joyful', 'angry', 'joyful1', 'joyful4', 'angry1', 'anxious', 'anxious3']} size={100}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width:'100%'
  },
});
