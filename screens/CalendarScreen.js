import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Themes from '../assets/Themes';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


export default function CalendarScreen() {
    const navigator = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Calendar 
            markingType={'custom'}
            markedDates={{
                '2022-11-28': {
                customStyles: {
                    container: {
                    backgroundColor: 'red',
                    borderColor: 'green',
                    borderWidth: 3,
                    justifyContent: 'center',
                    },
                    text: {
                    color: 'black',
                    fontWeight: 'bold'
                    }
                }
                },
                '2022-11-29': {
                customStyles: {
                    container: {
                    backgroundColor: 'white',
                    elevation: 2
                    },
                    text: {
                    color: 'blue'
                    }
                }
                }
            }}/>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: Themes.background,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 50
    }  
});