import { Text, View, StyleSheet, Image } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Ellipse } from "react-native-svg";

function getStops(feelings, colorMapping) {
    let colors = [];
    for(let i = 0; i < feelings.length; i++){
        colors.push(colorMapping[feelings[i]]);
    }
    colors.push('white');
    let stops = [];
    for(let i = 0; i < colors.length; i++){
        const offset = (i+1) * (1/(colors.length));
        stops.push(
            <Stop offset={offset} stopColor={colors[i]} stopOpacity="1" />
        );
    }
    
    return stops;
}

export default function Emotion({ feelings, size, colorMapping }) {
    const stops = getStops(feelings, colorMapping);
    size = size.toString();
    return (
        <Svg height='100%' width="100%">
        <Defs>
        <RadialGradient
            id="grad"
            cx="50%"
            cy="50%"
            rx={size}
            ry={size}
            fx="50%"
            fy="50%"
            gradientUnits="userSpaceOnUse"
        >
            {stops}
        </RadialGradient>
        </Defs>
        <Ellipse cx="50%" cy="50%" rx={size} ry={size} fill="url(#grad)" />
    </Svg>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    width: '100%',
    height: '100%'
  },
});