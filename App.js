import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Emotion from './components/Emotion';
import BasicSelection from './components/BasicSelection';
import SecondSelection from './components/SecondSelection';
import Start from './app/screens/Start';
import HowDoYouFeel from './app/screens/HowDoYouFeel';
import CareToElaborate from './app/screens/CareToElaborate';
import colorMapping from './assets/feelings';
import SuggestedMotions from './components/SuggestedMotions';

const mapping = colorMapping;

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HowDoYouFeel/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
});
