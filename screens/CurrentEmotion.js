import { TextInput, Modal, StyleSheet, Text, Dimensions, View, SafeAreaView, Image, TouchableOpacity, Pressable} from 'react-native';
import Emotion from '../components/Emotion';
import { useNavigation } from '@react-navigation/native';
import FeelingContext from '../components/FeelingContext';
import React, { useContext, useState } from 'react';
import Themes from '../assets/Themes';
import Movement from '../components/Movement';
import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesome } from '@expo/vector-icons'; 




const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');


export default function CurrentEmotion() {

    const options = ["today's feelings", "current eMotion"];
    const [selected, setSelected] = useState("today's feelings");

    console.log(selected);
    const navigator = useNavigation();
    const context = useContext(FeelingContext);

    let firstEmotion = (context.movementData[context.getCurrentMovementIndex()].motionEntry.length === 1);
    
    function Visualization() {
        if (firstEmotion || selected === "current eMotion") {
            return (
                <View style={styles.movementBox}>
                    <Pressable style={styles.emotionBox} onPress = {() => {
                navigator.navigate('HowDoYouFeel')}}>
                        <Emotion feelings={context.currentFeelings}/>
                    </Pressable>
                </View>
            )
        } else {
            return (
                <Pressable style={styles.movementBox} onPress = {() => {
                    navigator.navigate('HowDoYouFeel')}}>
                    <Movement movementFeelings={context.movementFeelings(context.movementData[context.getCurrentMovementIndex()])} status={'current'}/>
                </Pressable>
            )
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <SelectDropdown
                data={options}
                onSelect={(selectedItem, index) => {
                    setSelected(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
                defaultValue={options[0]}
                buttonStyle ={styles.titleContainer}
                buttonTextStyle={styles.title}
                rowTextStyle={styles.optionText}
                dropdownStyle={{backgroundColor: Themes.background}}
                renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={20} />;
                  }}

            />

            <Visualization/>
            <TouchableOpacity style = {styles.button} onPress={() => {
                context.updateMotion('choosing', [])
                navigator.navigate('ChooseMotion')}
            }>
                <Text style = {styles.buttonText}> new movement </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Themes.background
    },
    title: {
        fontSize: SCREEN_HEIGHT * 0.045,
        textAlign: 'center',
        paddingTop: '7%',
        fontFamily: 'Avenir',
        fontWeight: 'bold',
    },
    buttonText: {
        fontFamily: 'Avenir',
        fontSize: SCREEN_HEIGHT * 0.03
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
     movementBox: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
        height: '58%',
     },
     emotionBox: {
        aspectRatio: 1,
        height: '50%',
        position: 'absolute'
     },
     titleContainer: {
        height: '11%',
        justifyContent: 'center',
        width: '90%',
        backgroundColor: Themes.background
     },
     optionText: {
        fontFamily: 'Avenir',
        fontSize: 20
     }
});