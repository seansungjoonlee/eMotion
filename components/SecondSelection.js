import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import { G, Circle, Text } from 'react-native-svg';

const basicFeelings = ["joyful", "anxious", "angry", "sad", "surprised"];

function check(value) {
        return value !== this;
}

export default function SecondSelection({ colorMapping, currentFeelings }){
    const currentBasic = currentFeelings;
    let data = [];
    for(let i = 0; i < currentBasic.length; i++){
        data.push(1);
    }

    let setCurrentFeelings;
    [currentFeelings, setCurrentFeelings] = useState(currentFeelings);
    const pieData = data
    .filter((value) => value > 0)
    .map((value, index) => ({
        value,
        svg: {
            fill: colorMapping[currentBasic[index]],
            onPress: () => {
                console.log('pressed')
            },
        },
        key: `pie-${index}`,
    }))

    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            let pos = currentFeelings.indexOf(basicFeelings[index]);
            console.log(currentFeelings);
            let weight = 'normal';
            let size = 10;
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <Text
                    key={index}
                    x={labelCentroid[ 0 ]}
                    y={labelCentroid[ 1 ]}
                    fill={'black'}
                    textAnchor={'middle'}
                    alignmentBaseline={'center'}
                    fontSize={size}
                    fontWeight={weight}
                    stroke={'black'}
                    strokeWidth={0.2}
                >
                    {currentBasic[index]}
                </Text>
            )
        })
    }

    return (
        <View style={styles.container}>
            <PieChart 
                style={styles.innerRing} 
                outerRadius={'4%'}
                innerRadius={40}
                data={pieData}
            >
                <Labels/>
            </PieChart>
            <PieChart 
                style={styles.outerRing} 
                outerRadius={'45%'}
                innerRadius={100}
                data={pieData}
            >
                <Labels/>
            </PieChart>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      width: '100%',
      height: '100%'
    },
    innerRing: {
        height: 200,
        width: 200,
        position: 'relative'
    },
    outerRing: {
        height: 200,
        width: 200,
        position: 'absolute',
        x: 0,
        y: 0
    }
  });