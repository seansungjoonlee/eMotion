import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Emotion from './components/Emotion';
import BasicSelection from './components/BasicSelection';
import SecondSelection from './components/SecondSelection';
import Start from './screens/Start';
import HowDoYouFeel from './screens/HowDoYouFeel';
import CareToElaborate from './screens/CareToElaborate';
import SuggestedMotions from './components/SuggestedMotions';
import { NavigationContainer } from './node_modules/@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChooseMotion from './screens/ChooseMotion';
import CurrentEmotion from './screens/CurrentEmotion';

export default function App() {
  const Stack = createStackNavigator();
  return (  
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name="HowDoYouFeel" component={HowDoYouFeel} />
        <Stack.Screen options={{headerShown: false}} name="CareToElaborate" component={CareToElaborate} />
        <Stack.Screen options={{headerShown: false}} name="CurrentEmotion" component={CurrentEmotion} />
        <Stack.Screen name="ChooseMotion" component={ChooseMotion} />
      </Stack.Navigator>
    </NavigationContainer>
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
