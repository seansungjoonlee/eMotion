import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Ellipse } from "react-native-svg";
import { basicFeelings, basicToSecondary } from '../assets/feelings.js';
import FeelingContext from './FeelingContext.js';
import { useContext } from 'react';


function getOutsideStops(movementFeelings, status, colorMapping) {
    const context = useContext(FeelingContext);
    let outsideFeelings = [];
    let insideFeelings = [];
    let colors = [];
    let stops = [];
    //let firstEmotion = (context.movementData[context.getCurrentMovementIndex()].motionEntry.length === 1);
    if (status === 'current') {
        for (let i = 0; i < movementFeelings.length - 1; i++) {
            for (let j = 0; j < movementFeelings[i].length; j++)
            {
                outsideFeelings.push(movementFeelings[i][j]);
            }
        }
        insideFeelings = movementFeelings[movementFeelings.length-1];
        
    } else {
        colors = ['white'];
        for (let i = 0; i < movementFeelings.length; i++) {
            for (let j = 0; j < movementFeelings[i].length; j++)
            {
                outsideFeelings.push(movementFeelings[i][j]);
            }
        }
    }


    for(let i = 0; i < basicFeelings.length; i++){
        if (insideFeelings.indexOf(basicFeelings[i]) > -1) {
                colors.push(colorMapping[basicFeelings[i]]);
            for (let j=0; j < basicToSecondary[basicFeelings[i]].length; j++) {
                if (insideFeelings.indexOf(basicToSecondary[basicFeelings[i]][j]) > -1) {
                    colors.push(colorMapping[basicToSecondary[basicFeelings[i]][j]]);
                }
            }
        }
    }
    for(let i = 0; i < insideFeelings.length; i++){
        const offset = (i + 1) * (0.35/(colors.length));
        stops.push(
            <Stop offset={offset} stopColor={colors[i]} stopOpacity="1" key={i}/>
        );
    }

    for(let i = 0; i < basicFeelings.length; i++){
        if (outsideFeelings.indexOf(basicFeelings[i]) > -1) {
                colors.push(colorMapping[basicFeelings[i]]);
            for (let j=0; j < basicToSecondary[basicFeelings[i]].length; j++) {
                if (outsideFeelings.indexOf(basicToSecondary[basicFeelings[i]][j]) > -1) {
                    colors.push(colorMapping[basicToSecondary[basicFeelings[i]][j]]);
                }
            }
        }
    }
    colors.push('white');
    for(let i = 0; i < (colors.length - insideFeelings.length); i++){
        let offset = 0.35 + (i + 1) * (0.6/(colors.length - insideFeelings.length));
        stops.push(
            <Stop offset={offset} stopColor={colors[i + insideFeelings.length]} stopOpacity="1" key={i}/>
        );
    }
    return stops;
}

export default function Movement({ movementFeelings, status } ) {
    const context = useContext(FeelingContext);
    const outsideStops = getOutsideStops(movementFeelings, status, context.colorMapping);
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
                    {outsideStops}
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
    position: 'relative'
  },
  inside: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%',
    width: '40%',
    position: 'absolute'
  }
});