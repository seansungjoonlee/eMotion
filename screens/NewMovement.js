import { TextInput, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import SecondSelection from '../../components/SecondSelection';
export default function CareToElaborate() {

return (
<>
<SafeAreaView>
    <Text style={styles.title}> Starting New Movement </Text>
    <Text>You got this!</Text>
    {/* replace with emotion component */}
    <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>emotion</Text>
        {/* include on press */}
    </TouchableOpacity>

    <TouchableOpacity style = {styles.selectButton}>
        <Text style = {styles.buttonText}> New Movement</Text>
    </TouchableOpacity>
</SafeAreaView>

<View style={styles.menu}>
    <Image source={require('../../assets/profile.png')}></Image>
    <Image source={require('../../assets/shared.png')}></Image>
</View>
</>
);
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 50
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 50
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        width: 300,
        height: 300,
        borderRadius: 300 / 2,
     },
    // take out
    buttonText: {
        fontSize: 25
    },  
    selectButton: {
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        padding: 20,
        margin: 100,
        witdh: 100,
        height: 70,
        borderRadius: 10
     },
     menu: {
        flexDirection: 'row' 
     }
});