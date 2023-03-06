import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Ellipse } from "react-native-svg";
import FeelingContext from './FeelingContext.js';
import { useContext } from 'react';
import {PulseAnimation} from 'react-native-animated-pulse';

function getStops(feelings, colorMapping) {
    let colors = [];
    if (feelings[0] === "startScreen") {
        colors = ['#d1d1d1', '#bfbfbf', '#c7c7c7', '#a3a3a3', '#b0b0b0']
    }
    else {
        for (let i = 0; i < feelings.length; i++) {
            colors.push(colorMapping[feelings[i]]);
        }
    }
    colors.push('white');
    let stops = [];
    for(let i = 0; i < colors.length; i++){
        const offset = (i+1) * (1/(colors.length));
        stops.push(
            <Stop offset={offset} stopColor={colors[i]} stopOpacity={i == colors.length -1 ? 0.2 : 1} key={i}/>
        );
    }
    
    return stops;
}
export default function Emotion({ feelings, noPulse }) {
    const context = useContext(FeelingContext);
    const stops = getStops(feelings, context.colorMapping);
    return (
        <View style={styles.container}>
            {noPulse == undefined && <PulseAnimation style={styles.pulse} color={feelings[0] == 'startScreen' ? '#b0b0b0' : context.colorMapping[feelings[feelings.length-1]]} numPulses={12} duration={1000} speed={12000} initialDiameter={300} diameter={250}/>}
            <Svg height='100%' width="100%">
                <Defs >
                <RadialGradient
                    id="grad"
                    cx="50%"
                    cy="50%"
                    rx="50%"
                    ry="50%"
                    fx="50%"
                    fy="50%"
                    gradientUnits="userSpaceOnUse"
                >
                    {stops}
                </RadialGradient>
                </Defs>
                <Ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="url(#grad)"/>
            </Svg>
            {feelings[0] == 'startScreen' && <Text style={styles.clickText}>click to begin</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
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