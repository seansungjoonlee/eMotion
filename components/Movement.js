import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Ellipse } from "react-native-svg";
import { colorMapping, basicFeelings, basicToSecondary } from '../assets/feelings.js';


function getOutsideStops(movementFeelings, status) {
    let colors = ['white'];
    let outsideFeelings = [];
    if (status === 'current') {
        for (let i = 0; i < movementFeelings.length - 1; i++) {
            for (let j = 0; j < movementFeelings[i].length; j++)
            {
                outsideFeelings.push(movementFeelings[i][j]);
            }
        } 
    } else {
        for (let i = 0; i < movementFeelings.length; i++) {
            for (let j = 0; j < movementFeelings[i].length; j++)
            {
                outsideFeelings.push(movementFeelings[i][j]);
            }
        }
    }

    if (outsideFeelings.length === 1) {
        colors.push(colorMapping[outsideFeelings[0]]);
    }
    else {
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
    }
    colors.push('white');
    let stops = [];
    for(let i = 0; i < colors.length; i++){
        const offset = 0.3 + (i + 1) * (0.7/(colors.length));
        stops.push(
            <Stop offset={offset} stopColor={colors[i]} stopOpacity="1" key={i}/>
        );
    }
    return stops;
}

export default function Movement({ movementFeelings, status } ) {
    const outsideStops = getOutsideStops(movementFeelings, status);
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