import { Text, View, StyleSheet } from 'react-native';
import FeelingContext from './FeelingContext.js';
import { useContext, useState, useEffect } from 'react';
import { SwipeablePanel } from 'rn-swipeable-panel';
import Timeline from 'react-native-timeline-flatlist';
import Emotion from './Emotion.js';

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
    const timelineProps = {
      circleColor: '#aaa',
      lineColor: '#aaa',
      circleSize: 10,
      detailContainerStyle: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        margin: 10
      }

    };

      useEffect(() => {
        var temp = []
        var firstItem = { title: 'Started the Day!', description: ':)'}
        if (context?.movementData[context.getCurrentMovementIndex()]){
          var movementData = context?.movementData?.[context.getCurrentMovementIndex()].motionEntry
          for (var entry of movementData) {
            temp.push({title: entry.feelings.join(', '), description: `from ${entry.name}`, circleColor: context.colorMapping[entry.feelings[0]], lineColor: context.colorMapping[entry.feelings[0]]})
          }
          temp.push(firstItem)
          setData(temp)
        }
      }, [])
    return (
      <SwipeablePanel {...panelProps} isActive={panel}>
        <View style={{margin: 20}}>
          <Text style={styles.text}>Find out where your eMotions are from</Text>
          <Timeline {...timelineProps} data={data}/> 
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