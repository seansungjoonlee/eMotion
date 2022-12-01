import { SafeAreaView, Text, View } from "react-native";

export default function MovementReflectionScreen({ route }) {
    let { date } = route.params;

    return (
        <SafeAreaView>
            <Text>
                {date}
            </Text>
        </SafeAreaView>
    )
}