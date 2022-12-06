import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Themes from '../assets/Themes.js';
import { useNavigation } from '@react-navigation/native';
import CalendarScreen from "../screens/CalendarScreen";
import MovementReflectionScreen from '../screens/MovementReflectionScreen.js';
import MovementOverview from '../screens/MovementOverview.js';
import ExerciseOverview from '../screens/ExerciseOverview.js';
import EditNote from '../screens/EditNote.js';
import AddingMotion from '../screens/AddingMotion.js';
import HowDoYouFeelAddMotion from '../screens/HowDoYouFeelAddMotion.js';
import CareToElaborateAddMotion from '../screens/CareToElaborateAddMotion.js';
import ExerciseOverviewEditable from '../screens/ExerciseOverviewEditable.js';
import ColorMenu from '../screens/ColorMenu.js';
import ColorSelection from '../screens/ColorSelection.js';


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
        <Stack.Screen options={{headerShown:false}} name="MovementOverview" component={MovementOverview} />
        <Stack.Screen options={{headerShown:false}} name="ExerciseOverview" component={ExerciseOverview} />
        <Stack.Screen options={{headerShown:false}} name="ExerciseOverviewEditable" component={ExerciseOverviewEditable} />
        <Stack.Screen options={{headerShown:true}} name="EditNote" component={EditNote} />
        <Stack.Screen options={{headerShown:false}} name="AddingMotion" component={AddingMotion} />
        <Stack.Screen options={{headerShown:false}} name="HowDoYouFeelAddMotion" component={HowDoYouFeelAddMotion} />
        <Stack.Screen options={{headerShown:false}} name="CareToElaborateAddMotion" component={CareToElaborateAddMotion} />
        <Stack.Screen options={{headerShown:true}} name="ColorMenu" component={ColorMenu} />
        <Stack.Screen options={{headerShown:true}} name="ColorSelection" component={ColorSelection} />



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
