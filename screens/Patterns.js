import React, { useContext, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import FeelingContext from '../components/FeelingContext'
import { useNavigation } from '@react-navigation/native'

export default function Patterns() {
  const context = useContext(FeelingContext)
  const navigator = useNavigation()

  const [localColorMapping, setLocalColorMapping] = useState(
    context.colorMapping,
  )

  return (
    <SafeAreaView>
      <View style={styles.backArrow}>
        <MaterialIcons
          name="keyboard-backspace"
          size={50}
          color="black"
          onPress={() => navigator.goBack()}
        />
      </View>
      <View style={styles.instructionsContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Feeling Patterns</Text>
        </View>
        <Text style={[styles.title, {fontSize: 20}]}>(Select an emotion to analyze)</Text>
      </View>
      <View style={styles.colorsContainer}>
        <ScrollView style={styles.emotionsContainer}>
          <View style={styles.innerContainer}>
            {Object.keys(context.emotionsData).map((feeling) => {
              return (
                <View>
                  <View style={styles.feelingGroup}>
                    <TouchableOpacity
                      onPress={() => {
                        console.log(feeling)
                        navigator.navigate('ColorBreakdown', {
                          feeling: feeling,
                          navigator: navigator

                        })
                      }}
                      style={[
                        styles.basic,
                        { backgroundColor: localColorMapping[feeling] },
                      ]}
                    >
                      <Text style={styles.basic}>{feeling}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.secondaryContainer}>
                    {context.emotionsData[feeling].map((secondary) => {
                      return (
                        <TouchableOpacity

                          onPress={() => {
                        console.log(feeling)
                            navigator.navigate('ColorBreakdown', {
                              feeling: secondary,
                              navigator: navigator
                            })
                          }}
                          style={[
                            styles.secondaryView,
                            { backgroundColor: localColorMapping[secondary] },
                          ]}
                        >
                          <Text style={styles.secondary}>{secondary}</Text>
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                </View>
              )
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  title: {
    fontWeight: '800',
    fontSize: 24,
    textAlign: 'center',
  },
  titleContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  emotionsContainer: {
    backgroundColor: 'white',
    height: 600,
    borderRadius: 20,
    padding: 20,
  },
  innerContainer: {
    paddingBottom: 40,
  },
  color: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '90%',
    left: '2.5%',
  },
  feelingGroup: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  basic: {
    borderRadius: 10,
    padding: 5,
    fontSize: 25,
  },
  secondary: {
    fontSize: 20,
  },
  secondaryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  secondaryView: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  backArrow: {
    height: 50,
    position: 'absolute',
    left: 0,
    marginTop: 40,
  },
})
