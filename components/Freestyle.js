import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import HowDoYouFeel from '../screens/HowDoYouFeel';
import CareToElaborate from '../screens/CareToElaborate';
import PlaceHolderScreen from '../screens/PlaceHolderScreen';
import { NavigationContainer } from '../node_modules/@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Freestyle() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown:false}} name="HowDoYouFeel" component={HowDoYouFeel} />
          <Stack.Screen options={{headerShown: false}} name="CareToElaborate" component={CareToElaborate} />
          <Stack.Screen options={{headerShown: false}} name="PlaceHolderScreen" component={PlaceHolderScreen} />
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
      width: '100%'
    },
  });