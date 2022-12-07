import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import { G, Circle, Text } from 'react-native-svg';
import { basicFeelings, basicToSecondary } from '../assets/feelings.js';
import FeelingContext from './FeelingContext.js';
import { useContext } from 'react';



function check(value) {
        return value !== this;
}

export default function SecondSelection({ basic, secondary, setSecondary }){
    const context = useContext(FeelingContext);
    let innerData = [];
    let outerData = [];
    let outerFeelings = [];
    for(let i = 0; i < basic.length; i++){
        innerData.push(1);
        for (let j = 0; j < basicToSecondary[basic[i]].length; j++) {
            outerData.push(1);
            outerFeelings.push(basicToSecondary[basic[i]][j]);
        }
    }

    const innerPieData = innerData
    .filter((value) => value > 0)
    .map((value, index) => ({
        value,
        svg: {
            fill: context.colorMapping[basic[index]],
            onPress: () => {
            },
        },
        key: `innerPie-${index}`,
    }))

    const outerPieData = outerData
    .filter((value) => value > 0)
    .map((value, index) => ({
        value,
        svg: {
            fill: context.colorMapping[outerFeelings[index]],
            onPress: () => {
                let pos = secondary.indexOf(outerFeelings[index]);
                if (pos === -1) {
                    setSecondary(secondary => [...secondary, outerFeelings[index]]);
                }
                else {
                    let updated = [];
                    for (let i = 0; i < secondary.length; i++) {
                        if (i !== pos) {
                            updated.push(secondary[i]);
                        }
                    }
                    setSecondary(updated);
                }
            },
        },
        key: `outerPie-${index}`,
    }))

    const LabelsInner = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            let pos = basic.indexOf(basicFeelings[index]);
            let weight = 'bolder';
            let size = (6 + 12 * (1 / context.basic.length)) * 1.15;
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <Text
                    key={index}
                    x={labelCentroid[ 0 ]}
                    y={labelCentroid[ 1 ]}
                    fill={'black'}
                    textAnchor={'middle'}
                    alignmentBaseline={'center'}
                    fontFamily={'Avenir'}
                    fontSize={size}
                    fontWeight={weight}
                    stroke={'black'}
                    strokeWidth={0.2}
                >
                    {basic[index]}
                </Text>
            )
        })
    }

    const LabelsOuter = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            let pos = secondary.indexOf(outerFeelings[index]);
            let weight = 'normal';
            let size = 7 + 9 * (1 / context.basic.length);
            if (pos !== -1) {
                weight = 'bolder';
                size = size * 1.15;
            }
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <Text
                    key={index}
                    x={labelCentroid[ 0 ]}
                    y={labelCentroid[ 1 ]}
                    fill={'black'}
                    textAnchor={'middle'}
                    alignmentBaseline={'center'}
                    fontFamily={'Avenir'}
                    fontSize={size}
                    fontWeight={weight}
                    stroke={'black'}
                    strokeWidth={0.2}
                >
                    {outerFeelings[index]}
                </Text>
            )
        })
    }

    return (
        <View style={styles.container}>
            <PieChart 
                style={styles.outerRing} 
                outerRadius={'42%'}
                innerRadius={150}
                data={outerPieData}
            >
                <LabelsOuter/>
            </PieChart>
            <PieChart 
                style={styles.innerRing} 
                outerRadius={'1.5%'}
                innerRadius={58}
                data={innerPieData}
            >
                <LabelsInner/>
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
        height: 300,
        width: 300,
        position: 'relative'
    },
    outerRing: {
        height: 300,
        width: 300,
        position: 'absolute',
        x: 0,
        y: 0
    }
  });