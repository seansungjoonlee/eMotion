import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Themes from '../assets/Themes';
import { useState } from 'react';
import { useContext } from 'react';
import FeelingContext from './FeelingContext';

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
                    fontSize={20}
                    defaultValue={note}
                    editable={editable}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {
                    context.editNote('reflection', date, fullNames[0], newNote);
                    setEditable(!editable)
                }}>
                    <Text>
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
        fontSize: 20
    },

    note: {
        padding: 10,
        alignItems: 'left',
        justifyContent: 'flex-start',
        width: 300,
        height: '20%',
        backgroundColor: "grey",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: Themes.background
    },
    noteHeader: {
        fontSize: 25,
        marginHorizontal: 60
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
    }
});