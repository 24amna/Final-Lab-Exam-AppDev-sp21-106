import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const ProgressBar = () => {
  const [progress, setProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 2000, 
      useNativeDriver: false,
    }).start();
  }, []);

  const interpolatedProgress = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progressBar,
          { width: interpolatedProgress },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 260,
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height:'100%',
    backgroundColor: '#5D4A66', 
  },
});

export default ProgressBar;
