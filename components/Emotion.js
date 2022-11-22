import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Ellipse } from "react-native-svg";
import { colorMapping, basicFeelings, basicToSecondary } from '../assets/feelings.js';

function getStops(feelings) {
    let colors = [];

    if (feelings.length === 1) {
        colors.push(colorMapping[feelings[0]]);
    }
    else {
        for(let i = 0; i < basicFeelings.length; i++){
            if (feelings.indexOf(basicFeelings[i]) > -1) {
                colors.push(colorMapping[basicFeelings[i]]);
                for (let j=0; j < basicToSecondary[basicFeelings[i]].length; j++) {
                    if (feelings.indexOf(basicToSecondary[basicFeelings[i]][j]) > -1) {
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

export default function Emotion({ feelings }) {
    const stops = getStops(feelings, colorMapping);
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