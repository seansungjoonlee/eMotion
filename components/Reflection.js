import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '../node_modules/@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Themes from '../assets/Themes.js';
import { useNavigation } from '@react-navigation/native';
import CalendarScreen from "../screens/CalendarScreen";

export default function Reflection({ navigation }) {
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
