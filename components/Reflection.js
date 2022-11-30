import { Text, SafeAreaView } from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default function Reflection() {
    return (
        <SafeAreaView>
            <Text>Reflection Screen </Text>
            <Calendar/>
        </SafeAreaView>
    );
}