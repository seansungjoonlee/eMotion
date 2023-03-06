import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native';

import OnboardingItem from '../components/Onboarding/OnboardingItem'
import slides from '../utils/screens'
import Paginator from '../components/Onboarding/Paginator'

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const slidesRef = useRef(null)
  const scrollX = useRef(new Animated.Value(0)).current
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index)
  }).current
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current
  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      <Paginator data={slides} scrollX={scrollX}/>

      <FlatList
        data={slides}
        horizontal
        bounces={false}
        showHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => <OnboardingItem navigator={navigator} item={item} />}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          },
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'white'
  },
})
