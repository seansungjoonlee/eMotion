import { StyleSheet, Text, View } from 'react-native';
import Emotion from './components/Emotion';

export default function App() {
  return (
    <View style={styles.container}>
      <Emotion feelings = {['happy', 'surprised', 'sad', 'angry', 'anxious']} size = {100}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
