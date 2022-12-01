import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Themes from '../assets/Themes.js';
import { useNavigation } from '@react-navigation/native';
import CalendarScreen from "../screens/CalendarScreen";
import MovementReflectionScreen from '../screens/MovementReflectionScreen.js';

export default function ReflectionTask({ navigation }) {
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
        <Stack.Screen options={{headerShown:false}} name="CalendarScreen" component={CalendarScreen} />
        <Stack.Screen options={{headerShown:true}} name="MovementReflectionScreen" component={MovementReflectionScreen} />

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
