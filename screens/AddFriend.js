import { SafeAreaView, Alert, View, Text, Pressable, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Themes from "../assets/Themes";
import { MaterialIcons } from '@expo/vector-icons'; 
import { useState } from "react";
import ContactList from "../components/ContactList";

export default function AddFriend() {
    const navigator = useNavigation();
    const [method, setMethod] = useState('contacts');
    const contacts = [{name: 'Hawi', username: '@hawia'},
                        {name: 'Ethan', username: '@ethanf'},
                        {name: 'Linda', username: '@lindad'},
                        {name: 'Devorah', username: '@devorahs'},
                        {name: 'James', username: '@proflanday'}]

    function contactDisplay() {
        return (
            <View style={styles.contactDisplay}>
                <Text style={styles.label}>
                    These contacts are already on eMotion!
                </Text>
                <View style={styles.contacts}>
                    <ContactList contacts={contacts}/>
                </View>
            </View>
        )
    };

    function inviteDisplay() {
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
            <View style={styles.inviteDisplay}>
                <Text style={styles.inviteText}>
                    Invite someone to join eMotion!
                </Text>
                <TouchableOpacity style={styles.button} onPress={copyInviteAlert}>
                    <Text style={styles.buttonText}>
                        copy invite link
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>
                        send invite text
                    </Text>
                </TouchableOpacity>
            </View>
        )
    };

    let Display = contactDisplay;
    let contactsUnderline = 'underline';
    let inviteUnderline = 'none';

    if (method === 'contacts') {
        Display = contactDisplay;
        contactsUnderline = 'underline';
        inviteUnderline = 'none';
    } else {
        Display = inviteDisplay;
        contactsUnderline= 'none';
        inviteUnderline = 'underline';
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.backArrowBox}>
                <MaterialIcons name="keyboard-backspace" size={50} color="black" onPress={() => navigator.navigate('CommunityFeedScreen')}/>
            </View>
            <Text style={styles.title}>
                add a friend
            </Text>
            <View style={styles.methodSelectBox}>
            <Text style={[styles.select, {textDecorationLine: contactsUnderline}]} onPress={() => setMethod('contacts')}>
                contacts
            </Text>
            <Text style={[styles.select, {textDecorationLine: inviteUnderline}]} onPress={() => setMethod('invite')}>
                invite
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
        marginTop: 5
    },
    methodSelectBox: {
        height: '9%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        height: '83%'
    },
    inviteDisplay: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '60%'
    },
    button: {
        height: 50,
        width: 250,
        backgroundColor: Themes.background,
        borderRadius: 1000,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        fontFamily: 'Avenir',
        fontSize: 20
    },
    inviteText: {
        fontFamily: 'Avenir',
        fontSize: 20,
        marginBottom: 10
    }
  });
  