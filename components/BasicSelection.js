import React from 'react'
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import { G, Circle, Text } from 'react-native-svg';

const data = [1, 1, 1, 1, 1];
const basicFeelings = ["joyful", "anxious", "angry", "sad", "surprised"];
let currentFeelings = [];

export default function BasicSelection({ colorMapping }){
    const pieData = data
    .filter((value) => value > 0)
    .map((value, index) => ({
        value,
        svg: {
            fill: colorMapping[basicFeelings[index]],
            onPress: () => {
                let pos = currentFeelings.indexOf(basicFeelings[index]);
                if (pos === -1) {
                    currentFeelings.push(basicFeelings[index]);
                }
                else {
                    currentFeelings.splice(pos, 1);
                }
                console.log(currentFeelings);
            },
        },
        key: `pie-${index}`,
    }))

    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <Text
                    key={index}
                    x={labelCentroid[ 0 ]}
                    y={labelCentroid[ 1 ]}
                    fill={'black'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={12}
                    stroke={'black'}
                    strokeWidth={0.2}
                >
                    {basicFeelings[index]}
                </Text>
            )
        })
    }

    return (
        <PieChart 
            style={{ height: 200, width: 200 }} 
            outerRadius={'4%'}
            innerRadius={100}
            data={pieData}
        >
            <Labels/>
        </PieChart>
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
  });