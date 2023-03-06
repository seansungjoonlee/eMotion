import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Themes from '../assets/Themes.js';
import SettingsPage from '../screens/SettingsPage.js';
import WorkInProgress from '../screens/WorkInProgress.js';

export default function SettingsTask({ navigation }) {
  const Stack = createStackNavigator();

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (  
    <Stack.Navigator screenOptions={{
      headerShown: false,
      cardStyleInterpolator: forFade,
   }}>
        <Stack.Screen options={{headerShown:false}} name="SettingsPage" component={SettingsPage} />
        <Stack.Screen options={{headerShown:false}} name="WorkInProgress" component={WorkInProgress} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.background,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    borderWidth: 3,
    borderColor: 'red'
  },
});