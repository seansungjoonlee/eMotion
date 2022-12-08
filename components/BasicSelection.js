import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import { G, Circle, Text } from 'react-native-svg';
import { basicFeelings, basicToSecondary } from '../assets/feelings.js';
import FeelingContext from './FeelingContext.js';
import { useContext } from 'react';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const data = [1, 1, 1, 1, 1];

export default function BasicSelection({ basic, setBasic }) {
    const context = useContext(FeelingContext);
    const pieData = data
    .filter((value) => value > 0)
    .map((value, index) => ({
        value,
        svg: {
            fill: context.colorMapping[basicFeelings[index]],
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
            let size = SCREEN_HEIGHT*.024;
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
                    {basicFeelings[index]}
                </Text>
            )
        })
    }

    return (
        <View style={styles.container}>
            <PieChart 
                style={{ width: '80%', aspectRatio: 1 }} 
                outerRadius={'4%'}
                innerRadius={'100%'}
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
      width: '100%',
      height: '100%',
    },
  });