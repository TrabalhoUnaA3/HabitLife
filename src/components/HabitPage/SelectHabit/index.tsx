import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import Habit from '../../../db/HabiDatabase';

interface SelectHabit {
  data: Habit[];
}

export default function SelectHabit({data}: SelectHabit) {
  const [selectedHabit, setSelectedHabit] = useState<string>('');
  const [habit, setHabit] = useState<string[]>([]);

  useEffect(() => {
    setHabit(data.map(it => it.title));
  }, [data]);

  const handleSelect = (selected: string) => {
    setSelectedHabit(selected);
  };
  return (
    <>
      <SelectList
        setSelected={handleSelect}
        data={habit}
        search={false}
        onSelect={() => {}}
        placeholder={selectedHabit || 'Escolha um hábito:'}
        boxStyles={styles.boxStyle}
        inputStyles={styles.inputStyle}
        dropdownStyles={styles.dropdownStyle}
        dropdownItemStyles={styles.dropdownItemStyle}
        dropdownTextStyles={styles.dropdownTextStyle}
        arrowicon={
          <Image
            source={require('../../../assets/icons/arrowDropdown.png')}
            style={styles.arrow}
          />
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  boxStyle: {
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  inputStyle: {
    color: 'white',
  },
  dropdownStyle: {
    borderWidth: 0,
  },
  dropdownItemStyle: {
    borderWidth: 1,
    borderColor: '#BBBB',
    borderRadius: 10,
    marginBottom: 15,
  },
  dropdownTextStyle: {
    color: '#BBBBBB',
  },
  arrow: {
    width: 20,
    height: 20,
  },
});
