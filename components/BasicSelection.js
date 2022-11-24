import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import { G, Circle, Text } from 'react-native-svg';
import { basicFeelings, basicToSecondary, colorMapping } from '../assets/feelings.js';

const data = [1, 1, 1, 1, 1];

export default function BasicSelection({ basic, setBasic }){
    const pieData = data
    .filter((value) => value > 0)
    .map((value, index) => ({
        value,
        svg: {
            fill: colorMapping[basicFeelings[index]],
            onPress: () => {
                let pos = basic.indexOf(basicFeelings[index]);
                if (pos === -1) {
                    setBasic(basic => [...basic, basicFeelings[index]]);
                }
                else {
                    let updated = [];
                    for (let i = 0; i < basic.length; i++) {
                        if (i !== pos) {
                            updated.push(basic[i]);
                        }
                    }
                    setBasic(updated);
                }
            },
        },
        key: `pie-${index}`,
    }))

    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            let pos = basic.indexOf(basicFeelings[index]);
            let weight = 'normal';
            let size = 12;
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
                    {basicFeelings[index]}
                </Text>
            )
        })
    }

    return (
        <PieChart 
            style={{ height: 300, width: 300 }} 
            outerRadius={'4%'}
            innerRadius={150}
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