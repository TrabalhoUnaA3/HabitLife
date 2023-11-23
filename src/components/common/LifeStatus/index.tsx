import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {CreateHabitObject} from '../../../services/HabitsService';
import AnimationService from '../../../services/AnimationService';

interface LifeStatus {
  mindHabit?: CreateHabitObject;
  moneyHabit?: CreateHabitObject;
  bodyHabit?: CreateHabitObject;
  funHabit?: CreateHabitObject;
}

export default function LifeStatus({
  mindHabit,
  moneyHabit,
  bodyHabit,
  funHabit,
}: LifeStatus) {
  const [mind, setMind] = useState('');
  const [money, setMoney] = useState('');
  const [robot, setRobot] = useState('');

  useEffect(() => {
    AnimationService.animationStatus(
      mindHabit?.progressBar,
      moneyHabit?.progressBar,
      bodyHabit?.progressBar,
      funHabit?.progressBar,
      setMind,
      setMoney,
      setRobot,
    );
  }, [mindHabit, moneyHabit, bodyHabit, funHabit]);
  return (
    <View style={styles.container}>
      <View style={styles.animationWrapper}>
        <LottieView
          source={mind}
          autoPlay
          loop
          style={styles.educationAnimation}
        />
        <LottieView
          source={money}
          autoPlay
          loop
          style={styles.robotAnimation}
        />
        <LottieView
          source={robot}
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
