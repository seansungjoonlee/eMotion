import { StyleSheet, Text, View } from 'react-native';
import Emotion from './components/Emotion';
import BasicSelection from './components/BasicSelection';
import SecondSelection from './components/SecondSelection';
import colorMapping from './assets/colorMapping';

const mapping = colorMapping;

export default function App() {
  return (
    <View style={styles.container}>
      <SecondSelection colorMapping={mapping} currentFeelings={['sad', 'anxious', 'joyful']}/>
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
