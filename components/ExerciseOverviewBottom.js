import { View, Dimensions, StyleSheet, KeyboardAvoidingView, Text, TextInput, TouchableOpacity } from 'react-native';
import Themes from '../assets/Themes';
import { useState } from 'react';
import { useContext } from 'react';
import FeelingContext from './FeelingContext';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');

export default function ExerciseOverviewBottom({ setEditable, editable, note, date, fullNames }) {
    
    const [newNote, setNewNote] = useState(note);
    const context = useContext(FeelingContext);

    let text = 'edit note'
    if (editable) {
        text = 'save changes'
    } else {
        text = 'edit note'
    }
    return (
        <View style={styles.container}>
            <View style={styles.noteLabel}>
                <Text style={styles.noteHeader}>
                    note:
                </Text>
            </View>
            <View style={styles.note}>
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={newNote => setNewNote(newNote)}
                    style={{padding: 10}}
                    fontSize={SCREEN_HEIGHT * 0.03}
                    defaultValue={note}
                    editable={editable}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {
                    context.editNote('reflection', date, fullNames[0], newNote);
                    setEditable(!editable)
                }}>
                    <Text style={styles.buttonText}>
                        {text}
                    </Text>
                </TouchableOpacity>
            </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        backgroundColor: Themes.background
    },
    noteLabel: {
        width: '100%',
        height: '8%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        fontSize: SCREEN_HEIGHT * 0.03
    },

    note: {
        padding: 10,
        alignItems: 'left',
        justifyContent: 'flex-start',
        width: '80%',
        height: '20%',
        backgroundColor: "grey",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: Themes.background
    },
    noteHeader: {
        // fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.0375,
        marginHorizontal: '14%'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Themes.background,
        borderWidth: 1,
        marginTop: '5%',
        width: '65%',
        height: '8%',
        borderRadius: 1000
     },
    buttonText: {
        // fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.03
    }
});