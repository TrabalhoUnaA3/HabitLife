import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Image} from 'react-native';

interface EditHabit {
  habit?: any;
  checkColor?: any;
}

export default function EditHabit({habit, checkColor}: EditHabit) {
  const [habitCheck, setHabitCheck] = useState<number | boolean>();
  const [checkImage, setCheckImage] = useState(
    require('../../../assets/icons/Mind.png'),
  );

  const handleEdit = () => {};
  const handleCheck = () => {};

  useEffect(() => {
    setHabitCheck(habit?.habitIsChecked);
    if (habit?.habitArea === 'Financeiro') {
      setCheckImage(require('../../../assets/icons/Money.png'));
    }
    if (habit?.habitArea === 'Corpo') {
      setCheckImage(require('../../../assets/icons/Body.png'));
    }
    if (habit?.habitArea === 'Humor') {
      setCheckImage(require('../../../assets/icons/Fun.png'));
    }
  }, [habit?.habitIsChecked, habit?.habitArea]);

  const textNotification =
    habit?.habitNotificationTime == null
      ? `Sem notificação - ${habit?.habitFrequency}`
      : `${habit?.habitNotificationTime} - ${habit?.habitFrequency}`;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.button}
      onPress={handleEdit}>
      <View>
        <Text style={styles.habitTitle}>{habit?.habitName}</Text>
        <Text style={styles.habitFrequency}>{textNotification}</Text>
      </View>
      {habitCheck === 0 ? (
        <TouchableOpacity
          style={[styles.check, {borderColor: checkColor}]}
          onPress={handleCheck}
        />
      ) : (
        <TouchableOpacity onPress={handleCheck}>
          <Image source={checkImage} style={styles.checked} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#151515',
    borderRadius: 5,
    width: 320,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  habitTitle: {
    color: 'white',
    fontWeight: 'bold',
  },

  habitFrequency: {
    color: 'white',
  },

  check: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
  },

  checked: {
    width: 25,
    height: 25,
  },
});
