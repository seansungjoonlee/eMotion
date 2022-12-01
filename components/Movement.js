import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Ellipse } from "react-native-svg";
import { colorMapping, basicFeelings, basicToSecondary } from '../assets/feelings.js';

function getOutsideStops(movementFeelings) {
    let colors = ['white'];
    let outsideFeelings = [];
    for (let i = 0; i < movementFeelings.length - 1; i++) {
        outsideFeelings.push(movementFeelings[i]);
    }

    console.log("here" + movementFeelings);

    for (let i = 0; i < outsideFeelings.length; i++) {
        let feelings = outsideFeelings[i];
        for(let j = 0; j < basicFeelings.length; j++){
            if (feelings.indexOf(basicFeelings[j]) > -1) {
                colors.push(colorMapping[basicFeelings[j]]);
                for (let k=0; k < basicToSecondary[basicFeelings[j]].length; k++) {
                    if (feelings.indexOf(basicToSecondary[basicFeelings[j]][k]) > -1) {
                        colors.push(colorMapping[basicToSecondary[basicFeelings[j]][k]]);
                    }
                }
            }
        }
    }

    colors.push('white');
    let stops = [];
    for(let i = 0; i < colors.length; i++){
        const offset = 0.4 + (i + 1) * (0.6/(colors.length));
        stops.push(
            <Stop offset={offset} stopColor={colors[i]} stopOpacity="1" key={i}/>
        );
    }
    return stops;
}

function getInsideStops(movementFeelings) {
    let colors = [];
    let insideFeelings = movementFeelings[movementFeelings.length-1];
    if (insideFeelings.length === 1) {
        colors.push(colorMapping[insideFeelings[0]]);
    }
    else {
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
    }
    colors.push('white');
    let stops = [];
    for(let i = 0; i < colors.length; i++){
        const offset = (i+1) * (1/(colors.length));
        stops.push(
            <Stop offset={offset} stopColor={colors[i]} stopOpacity="1" key={i}/>
        );
    }

    return stops;
}

export default function Movement({ movementFeelings} ) {
    const outsideStops = getOutsideStops(movementFeelings, colorMapping);
    const insideStops = getInsideStops(movementFeelings, colorMapping);
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
            <View style={styles.inside}>
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
                            {insideStops}
                        </RadialGradient>
                    </Defs>
                    <Ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="url(#grad)" />
                </Svg>
                </View>
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
    height: '50%',
    width: '50%',
    position: 'absolute'
  }
});