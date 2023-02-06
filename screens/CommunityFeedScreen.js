import { View, Text, Dimensions, StyleSheet } from "react-native";
import Themes from "../assets/Themes";
import FeedList from "../components/FeedList";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import friendsData from '../utils/friendsData';
import FeelingContext from "../components/FeelingContext";
import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');


export default function CommunityFeedScreen() {
    const navigator = useNavigation();
    const context = useContext(FeelingContext);
   
    let notifs = generateNotifs();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <FontAwesome5 name="user-plus" size={30} color="black" onPress={() => navigator.navigate('AddFriend')}/>
            </View>
            <Text style={styles.title}>
                community
            </Text>
            <View style={styles.notifsContainer}>
                <FeedList notifs={notifs}/>
            </View>
        </SafeAreaView>
    );
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNotifs() {
    const context = useContext(FeelingContext);

    let notifs = [];
    const affirmations = ["High five!", "Way to go!", "Nice going!", "Nice work!", "Super fun!", "How cool!", "Nice!"];
    const negative = "Maybe reach out?";
    const positive = "Good vibes!";
    const positives = ["surprised", "amazed", "joyful", "powerful", "playful", "content", "peaceful", "eager", "interested", "excited"];
    const negatives = ["frightened", "shocked", "stunned", "angry", "frustrated", "bored", "aggressive", "dismayed", "sad", "small", "melancholy", "discouraged", "hurt", "anxious", "stressed"];
    let today = context.getCurrentMovementIndex();
    if (today == -1) {
        return notifs;
    } else {
        let movement = context.movementData[today];
        for (let friendIndex = 0; friendIndex < friendsData.length; friendIndex++) {
            let notif = {};
            let shouldWe = randomNumber(0, 99);
            if (shouldWe < 60) {
                let friend = friendsData[friendIndex];
                notif.friend = friend.name;
                let randMotion = randomNumber(0, movement.motionEntry.length - 1);
                let motion = movement.motionEntry[randMotion];
                
                let motionOrEmotion = randomNumber(1, 2);
                if (motionOrEmotion == 1) {
                    //it's a motion  
                    if (!isNaN(parseInt(motion.name.slice(0,1)))) {
                        continue;
                    } else {
                    }
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
 
            notifs.push(notif);
            }
        }  
    }
    notifs = notifs.sort(() => Math.random() - 0.5)
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
        // fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: SCREEN_HEIGHT * 0.045,
    },
    topBar: {
        height: '7.5%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: '7%',
    },
    notifsContainer: {
        height: '86%',
    }
  });
