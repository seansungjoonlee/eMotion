import { Text, View, StyleSheet } from 'react-native';
import FeelingContext from './FeelingContext.js';
import { useContext, useState, useEffect } from 'react';
import { SwipeablePanel } from 'rn-swipeable-panel';
import EmotionTimeline from './EmotionTimeline.js';


export default function EmotionBreakdown({panel, setPanel}) {
    const context = useContext(FeelingContext);
    const [data, setData] = useState([])
    const panelProps = {
        fullWidth: true,
        openLarge: false,
        showCloseButton: true,
        noBackgroundOpacity: true,
        closeOnTouchOutside: true,
        onClose: () => setPanel(),
        onPressCloseButton: () => setPanel(),
      };

    return (
      <SwipeablePanel {...panelProps} isActive={panel}>
        <View style={{margin: 20}}>
          <Text style={styles.text}>Find out where your eMotions are from</Text>
          <EmotionTimeline movementDataProp={context?.movementData?.[context.getCurrentMovementIndex()]}/> 
        </View>
      </SwipeablePanel>
    );
}

const styles = StyleSheet.create({
  text: { 
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10
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