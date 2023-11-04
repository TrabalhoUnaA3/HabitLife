import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

export default function LifeStatus() {
  return (
    <View style={styles.container}>
      <View style={styles.animationWrapper}>
        <LottieView
          source={require('../../../assets/education/education-100.json')}
          autoPlay
          loop
          style={styles.educationAnimation}
        />
        <LottieView
          source={require('../../../assets/robot/robot-100-100.json')}
          autoPlay
          loop
          style={styles.robotAnimation}
        />
        <LottieView
          source={require('../../../assets/money/money-100.json')}
          autoPlay
          loop
          style={styles.moneyAnimation}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
  },

  animationWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },

  robotAnimation: {
    width: 190,
    marginTop: 30,
    marginLeft: -55,
    zIndex: 1,
  },

  educationAnimation: {
    width: 100,
    marginTop: 50,
    marginLeft: 5,
  },

  moneyAnimation: {
    width: 100,
    marginTop: 50,
    marginLeft: -55,
  },
});
