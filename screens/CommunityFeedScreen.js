import { View, Text, SafeAreaView, Pressable, StyleSheet } from "react-native";
import Themes from "../assets/Themes";
import FeedList from "../components/FeedList";

export default function CommunityFeedScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <FeedList/>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Themes.background,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '100%',
      width: '100%',
    },
  });