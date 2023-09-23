import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated'

const App = () => {
  const opacity = useSharedValue(1)
  const scale = useSharedValue(1)

  const animationStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      borderRadius: (opacity.value * styles.squareShape.width) / 2,
      transform: [
        { scale: scale.value },
        { rotate: `${opacity.value * 2 * Math.PI}rad` }
      ]
    }
  }, [])

  useEffect(() => {
    opacity.value = withRepeat(withSpring(0.5, { duration: 1000 }), 3, true);
    scale.value = withRepeat(withSpring(2, { duration: 1000 }), 3, true)
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.squareShape, animationStyle]} />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  squareShape: {
    width: 150,
    height: 150,
    backgroundColor: 'blue'
  }
})