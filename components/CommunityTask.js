import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Themes from '../assets/Themes.js';
import CommunityFeedScreen from '../screens/CommunityFeedScreen.js';
import AddFriend from '../screens/AddFriend.js';

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
        <Stack.Screen options={{headerShown:false}} name="CommunityFeedScreen" component={CommunityFeedScreen} />
        <Stack.Screen options={{headerShown:false}} name="AddFriend" component={AddFriend} />


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
