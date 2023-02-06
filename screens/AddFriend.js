import { Alert, View, Text, Pressable, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Themes from "../assets/Themes";
import { MaterialIcons } from '@expo/vector-icons'; 
import { useState } from "react";
import ContactList from "../components/ContactList";
import FriendList from "../components/FriendList";
import FeelingContext from "../components/FeelingContext";
import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');

export default function AddFriend() {
    const context = useContext(FeelingContext);
    const navigator = useNavigation();
    const [method, setMethod] = useState('contacts');


    const contacts = context.contacts;;
    const friends = context.friends

    function friendDisplay() {
        return (
            <View style={styles.contactDisplay}>
                <View style={styles.friends}>
                    <FriendList friends={friends}/>
                </View>
            </View>
        )
    };

    function addDisplay() {
        const copyInviteAlert = () =>
            Alert.alert(
            "invite link copied",
            "send invite link to a friend!",
            [
                {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
            );
        return (
            <View style={styles.contactDisplay}> 
                <TouchableOpacity style={styles.button} onPress={copyInviteAlert}>
                    <Text style={styles.buttonText}>
                        copy invite link
                    </Text>
                </TouchableOpacity>
                <Text style={styles.orText}>
                    contacts already on eMotion:
                </Text>
                <View style={styles.contacts}>
                    <ContactList contacts={contacts}/>
                </View>
            </View>
        )
    };

    let Display = addDisplay;
    let addUnderline = 'underline';
    let friendsUnderline = 'none'

    if (method === 'add') {
        Display = addDisplay;
        addUnderline = 'underline';
        friendsUnderline = 'none';
    } else {
        Display = friendDisplay;
        friendsUnderline = 'underline';
        addUnderline = 'none'

    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.backArrowBox}>
                <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => navigator.navigate('CommunityFeedScreen')}/>
            </View>
            <Text style={styles.title}>
                community
            </Text>
            <View style={styles.methodSelectBox}>
            <Text style={[styles.select, {textDecorationLine: friendsUnderline}]} onPress={() => setMethod('friends')}>
                friends
            </Text>
            <Text style={[styles.select, {textDecorationLine: addUnderline}]} onPress={() => setMethod('add')}>
                add
            </Text>
        </View>
            <Display/>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Themes.background,
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '100%',
      width: '100%',
    },
    backArrowBox: {
        width: '100%',
        justifyContent: 'center',
        height: '7.6%',
        paddingHorizontal: '4%',
    },
    title: {
        // fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: SCREEN_HEIGHT * 0.045,
    },
    methodSelectBox: {
        height: '9%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: '10%',
        alignItems: 'center',
    },
    select: {
        // fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.0375,
    },
    contactDisplay: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '2%',
        width: '100%'
    },
    label: {
        // fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.0225
    },
    contacts: {
        width: '100%',
        height: '61%'
    },
    friends: {
        width: '100%',
        height: '86%'
    },
    inviteDisplay: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '60%'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Themes.background,
        borderWidth: 1,
        marginTop: '8%',
        width: '65%',
        height: '8%',
        borderRadius: 1000
     },
    buttonText: {
        // fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.03
    },
    orText: {
        // fontFamily: 'Avenir',
        fontSize: '25',
        margin: SCREEN_HEIGHT * 0.0225
    }
  });
  
