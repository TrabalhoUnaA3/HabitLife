import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';

export default function SelectHabit() {
  return (
    <>
      <SelectList
        setSelected={() => {}}
        data={['Teste1', 'Teste2']}
        search={false}
        onSelect={() => {}}
        placeholder={'Teste1'}
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
