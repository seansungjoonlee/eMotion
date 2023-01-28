import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Ellipse } from "react-native-svg";
import { basicFeelings, basicToSecondary } from '../assets/feelings.js';
import FeelingContext from './FeelingContext.js';

import { useContext } from 'react';

function getStops(feelings, colorMapping) {
    console.log("feelings: " + feelings);
    console.log("basic feelings: " + basicFeelings);
    let colors = [];
    if (feelings.length == 0) {
        console.log("here");
        colors = ['#d1d1d1', '#bfbfbf', '#c7c7c7', '#a3a3a3', '#b0b0b0']
    }
    else if (feelings.length === 1) {
        colors.push(colorMapping[feelings]);
        
    }
    else {
        // for(let i = 0; i < basicFeelings.length; i++){
        //     if (feelings.indexOf(basicFeelings[i]) > -1) {
        //         colors.push(colorMapping[basicFeelings[i]]);
        //         for (let j=0; j < basicToSecondary[basicFeelings[i]].length; j++) {
        //             if (feelings.indexOf(basicToSecondary[basicFeelings[i]][j]) > -1) {
        //                 colors.push(colorMapping[basicToSecondary[basicFeelings[i]][j]]);
        //             }
        //         }
        //     }
        // }
        for(let i = 0; i < feelings.length; i++){
            console.log("here: " + feelings[i]);
            // if (feelings.indexOf(feelings[i]) > -1) {
                colors.push(colorMapping[feelings[i]]);
                // for (let j=0; j < basicToSecondary[basicFeelings[i]].length; j++) {
                //     if (feelings.indexOf(basicToSecondary[basicFeelings[i]][j]) > -1) {
                //         colors.push(colorMapping[basicToSecondary[basicFeelings[i]][j]]);
                //     }
                // }
            // }
        }
    }
    colors.push('white');
    let stops = [];
    for(let i = 0; i < colors.length; i++){
        const offset = (i+1) * (1/(colors.length));
        console.log("stops colors: " + colors[i]);

        stops.push(
            <Stop offset={offset} stopColor={colors[i]} stopOpacity="1" key={i}/>
        );
    }
    
    return stops;
}

export default function Emotion({ feelings }) {
    const context = useContext(FeelingContext);
    const stops = getStops(context.basic, context.colorMapping);

    return (
        <View style={styles.container}>
            <Svg height='100%' width="100%">
                <Defs>
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
                <Ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="url(#grad)" />
            </Svg>
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
});