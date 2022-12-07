import { View, Text, SafeAreaView, Pressable, StyleSheet } from "react-native";
import Themes from "../assets/Themes";
import FeedList from "../components/FeedList";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";



export default function CommunityFeedScreen() {
    const navigator = useNavigation();

    const notifs = [{friend: "Devorah", message:'...both felt anxious and sad tonight. Try comforting each other.'}, 
                    {friend: "Ethan", message:'...both logged squats today. High five!'}, 
                    {friend: 'Hawi', message: '...both logged yoga today. Namaste!'}]

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <FontAwesome5 name="user-plus" size={24} color="black" onPress={() => navigator.navigate('AddFriend')}/>
            </View>
            <Text style={styles.title}>
                friends
            </Text>
            <FeedList notifs={notifs}/>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Themes.background,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '100%',
      width: '100%',
    },
    title: {
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 5
    },
    topBar: {
        height: '5%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 30,
        marginTop: 10
    }
  });