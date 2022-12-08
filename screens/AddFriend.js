import { SafeAreaView, Alert, View, Text, Pressable, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Themes from "../assets/Themes";
import { MaterialIcons } from '@expo/vector-icons'; 
import { useState } from "react";
import ContactList from "../components/ContactList";
import FriendList from "../components/FriendList";
import FeelingContext from "../components/FeelingContext";
import { useContext } from "react";

export default function AddFriend() {
    const context = useContext(FeelingContext);
    const navigator = useNavigation();
    const [method, setMethod] = useState('contacts');
    // const contacts = [{name: 'Hawi', username: '@hawia'},
    //                     {name: 'Ethan', username: '@ethanf'},
    //                     {name: 'Linda', username: '@lindad'},
    //                     {name: 'Devorah', username: '@devorahs'},
    //                     {name: 'James', username: '@proflanday'}]

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
        height: 45,
        width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: 30,
    },
    methodSelectBox: {
        height: '9%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: 50,
        alignItems: 'center',
    },
    select: {
        fontFamily: 'Avenir',
        fontSize: 25,
    },
    contactDisplay: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20
    },
    label: {
        fontFamily: 'Avenir',
        fontSize: 15
    },
    contacts: {
        width: '100%',
        height: '65%'
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
        height: 50,
        width: 200,
        backgroundColor: Themes.background,
        borderRadius: 1000,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'Avenir',
        fontSize: 20
    },
    inviteText: {
        fontFamily: 'Avenir',
        fontSize: 15,
        marginBottom: 5
    },
    orText: {
        fontFamily: 'Avenir',
        fontSize: '25',
        margin: 15
    }
  });
  
