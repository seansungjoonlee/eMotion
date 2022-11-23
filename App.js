import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Emotion from './components/Emotion';
import BasicSelection from './components/BasicSelection';
import SecondSelection from './components/SecondSelection';
import Start from './screens/Start';
import HowDoYouFeel from './screens/HowDoYouFeel';
import CareToElaborate from './screens/CareToElaborate';
import SuggestedMotions from './components/SuggestedMotions';
import { NavigationContainer } from './node_modules/@react-navigation/native';
import Freestyle from './components/Freestyle';

export default function App() {
  return (
    <Freestyle/>
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
    borderWidth: 3,
    borderColor: 'red'
  },
});
