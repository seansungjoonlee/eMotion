import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Feather, Ionicons, AntDesign, Entypo } from '@expo/vector-icons'; 

export default function SettingsPage () {
    const navigator = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <TouchableOpacity onPress={() => navigator.navigate('WorkInProgress')} style={styles.suggested}>
                <Image source={require('../assets/icons/suggested.png')}/>
                <Text style={styles.text}>Edit Suggested Motion</Text>
                <AntDesign name="right" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigator.navigate("WorkInProgress")} style={styles.option}>
                <View style={styles.left}>
                    <Ionicons name="moon" size={24} color="black" />
                    <Text style={styles.optionText}>Dark Mode</Text>
                </View>
                <View style={styles.right}>
                    <Feather name="toggle-left" size={24} color="black" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigator.navigate("WorkInProgress")} style={styles.option}>
                <View style={styles.left}>
                    <Ionicons name="notifications-circle" size={24} color="black" />
                    <Text style={styles.optionText}>Notifications</Text>
                </View>
                <View style={styles.right}>
                    <AntDesign name="right" size={24} color="black" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigator.navigate("WorkInProgress")} style={styles.option}>
                <View style={styles.left}>
                    <Ionicons name="language" size={24} color="black" />
                    <Text style={styles.optionText}>Languages</Text>
                </View>
                <View style={styles.right}>
                    <AntDesign name="right" size={24} color="black" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigator.navigate("WorkInProgress")} style={styles.option}>
                <View style={styles.left}>
                 <Entypo name="help-with-circle" size={24} color="black" />
                    <Text style={styles.optionText}>Help & Feedback</Text>
                </View>
                <View style={styles.right}>
                    <AntDesign name="right" size={24} color="black" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigator.navigate("WorkInProgress")} style={styles.option}>
                <View style={styles.left}>
                    <Entypo name="text-document-inverted" size={24} color="black" />
                    <Text style={styles.optionText}>About</Text>
                </View>
                <View style={styles.right}>
                    <AntDesign name="right" size={24} color="black" />
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: '800'
    },
    container: {
        margin: 20,
        backgroundColor: '#F1F3F5'
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600'
    },
    optionText: {
        fontSize: 20,
        marginLeft: 20,
        fontWeight: '700'
    },
    option: {
        backgroundColor: 'white',
        borderRadius: 4,
        flexDirection: 'row',
        marginTop: 20,
        padding: 20
    },
    left: {
        flex: 6,
        flexDirection: 'row',

    },
    right: {
        flex: 1
    },
    suggested: {
        backgroundColor: '#F96464',
        flexDirection: 'row', 
        justifyContent: 'space-around',
        padding: 20,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowRadius: 3.5,
        elevation: 5,
    }
})