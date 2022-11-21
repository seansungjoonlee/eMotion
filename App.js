import { StyleSheet, Text, View } from 'react-native';
import Start from './app/screens/Start';
import HowDoYouFeel from './app/screens/HowDoYouFeel';
import CareToElaborate from './app/screens/CareToElaborate';

export default function App() {
  return (
    <CareToElaborate/>
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
