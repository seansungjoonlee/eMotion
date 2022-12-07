import { View, Text, SafeAreaView, Pressable, StyleSheet } from "react-native";
import Themes from "../assets/Themes";
import FeedList from "../components/FeedList";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import movementData from '../utils/movementData';
import friendsData from '../utils/friendsData';



export default function CommunityFeedScreen() {
    const navigator = useNavigation();

    // const notifs = [{friend: "Devorah", message:'...both felt anxious and sad tonight. Try comforting each other.'}, 
    //                 {friend: "Ethan", message:'...both logged squats today. High five!'}, 
    //                 {friend: 'Hawi', message: '...both logged yoga today. Namaste!'}]

    
    let notifs = generateNotifs();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <FontAwesome5 name="user-plus" size={24} color="black" onPress={() => navigator.navigate('AddFriend')}/>
            </View>
            <Text style={styles.title}>
                community
            </Text>
            <FeedList notifs={notifs}/>

            {/* <FeedList notifs={generateNotifs()}/> */}

        </SafeAreaView>
    );
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNotifs() {
    console.log("generating!");
    let notifs = [];
    const affirmations = ["High five!", "Way to go!", "Nice going!", "Nice work!", "Super fun!", "How cool!", "Nice!"];
    const negative = "Maybe reach out?";
    const positive = "Good vibes!";
    const positives = ["surprised", "amazed", "joyful", "powerful", "playful", "content", "peaceful", "eager", "interested", "excited"];
    const negatives = ["frightened", "shocked", "stunned", "angry", "frustrated", "bored", "aggressive", "dismayed", "sad", "small", "melancholy", "discouraged", "hurt", "anxious", "stressed"];
    //THIS SHOULD BE TODAY NOT LAST
    let movement = movementData[movementData.length - 1];
    for (let friendIndex = 0; friendIndex < friendsData.length; friendIndex++) {
        let notif = {};
        let shouldWe = randomNumber(0, 99);
        if (shouldWe < 80) {
            let randFriend = randomNumber(0, friendsData.length - 1);
            let friend = friendsData[randFriend];
            notif.friend = friend.name;
            let randMotion = randomNumber(0, movement.motionEntry.length - 1);
            let motion = movement.motionEntry[randMotion];
            if (!isNaN(parseInt(motion.name.slice(0,1)))) {
                console.log("was a time " + motion.name);
                continue;
            } else {
                console.log("not a time " + motion.name);
            }
            let motionOrEmotion = randomNumber(1, 2);
            if (motionOrEmotion == 1) {
                //it's a motion  
                let randAffirmation = randomNumber(0, affirmations.length - 1);
                let affirmation = affirmations[randAffirmation];
                notif.message = '...both logged ' + motion.name.slice(0, motion.name.length - 2) + ' today. ' + affirmation;
            } else {
                //it's a feeling
                let randFeeling = randomNumber(0, motion.feelings.length - 1);
                let feeling = motion.feelings[randFeeling];
                if (positives.includes(feeling)) {
                    notif.message = 'both felt ' + feeling + ' today. ' + positive;
                } else if (negatives.includes(feeling)) {
                    notif.message = 'both felt ' + feeling + ' today. ' + negative;
                } else {
                    notif.message = 'both felt ' + feeling + ' today.';
                }
            }   
        // console.log(notif.friend);
        // console.log(notif.message);   
        notifs.push(notif);
        }
    }  
    return notifs;
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
