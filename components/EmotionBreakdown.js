import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import FeelingContext from './FeelingContext.js';
import { useContext, useState } from 'react';
import { SwipeablePanel } from 'rn-swipeable-panel';
import Timeline from 'react-native-timeline-flatlist';

export default function EmotionBreakdown({panel, setPanel}) {
    const context = useContext(FeelingContext);
    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,
        showCloseButton: true,
        noBackgroundOpacity: true,
        closeOnTouchOutside: true,
        onClose: () => setPanel(),
        onPressCloseButton: () => setPanel(),
      });
    return (
        <View style={styles.container}>
            <SwipeablePanel {...panelProps} isActive={panel}>
                <View style={styles.panelContent}>
                    <Text style={styles.text}>Find out where your eMotions are from</Text>
                    <Timeline /> 
                </View>
            </SwipeablePanel>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  panelContent: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '80%',
    position: 'absolute',
    left: '10%'
},
text: { 
    fontSize: 25,
    fontWeight: '700',
  },
  clickText: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: '200'
  },
  pulse: {
    position: 'absolute',
  }
});