import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import { G, Circle, Text } from 'react-native-svg';
import { basicFeelings, basicToSecondary, colorMapping } from '../assets/feelings.js';


function check(value) {
        return value !== this;
}

export default function SecondSelection({ currentFeelings, currentSecondary, setCurrentSecondary }){
    const currentBasic = currentFeelings;
    let innerData = [];
    let outerData = [];
    let outerFeelings = [];
    for(let i = 0; i < currentBasic.length; i++){
        innerData.push(1);
        for (let j = 0; j < basicToSecondary[currentBasic[i]].length; j++) {
            outerData.push(1);
            outerFeelings.push(basicToSecondary[currentBasic[i]][j]);
        }
    }

    const innerPieData = innerData
    .filter((value) => value > 0)
    .map((value, index) => ({
        value,
        svg: {
            fill: colorMapping[currentBasic[index]],
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
            fill: colorMapping[outerFeelings[index]],
            onPress: () => {
                let pos = currentSecondary.indexOf(outerFeelings[index]);
                if (pos === -1) {
                    setCurrentSecondary(currentSecondary => [...currentSecondary, outerFeelings[index]]);
                }
                else {
                    let updated = [];
                    for (let i = 0; i < currentSecondary.length; i++) {
                        if (i !== pos) {
                            updated.push(currentSecondary[i]);
                        }
                    }
                    setCurrentSecondary(updated);
                }
            },
        },
        key: `outerPie-${index}`,
    }))

    const LabelsInner = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            let pos = currentFeelings.indexOf(basicFeelings[index]);
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

    const LabelsOuter = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            let pos = currentSecondary.indexOf(outerFeelings[index]);
            let weight = 'normal';
            let size = 10;
            if (pos !== -1) {
                weight = 'bold';
                size = 14;
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