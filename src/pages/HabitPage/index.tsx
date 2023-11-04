/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SelectHabit from '../../components/HabitPage/SelectHabit';
import SelectFrequency from '../../../src/components/HabitPage/SelectFrequency';
import Notification from '../../../src/components/HabitPage/Notification';
import TimeDataPicker from '../../../src/components/HabitPage/TimeDataPicker';
import UpdateExcludeButtons from '../../../src/components/HabitPage/UpdateExcludeButtons';
import DefaultButton from '../../../src/components/common/DefaultButton';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

export default function HabitPage() {
  const [frequencyInput, setFrequencyInput] = useState('Diário');
  const [notificationToggle, setNotificationToggle] = useState(false);
  const [dayNotification, setDayNotification] = useState('');
  const [timeNotification, setTimeNotification] = useState('');

  var create = true;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <TouchableOpacity style={styles.backPageBtn} onPress={() => {}}>
            <Image
              source={require('../../assets/icons/arrowBack.png')}
              style={styles.arrowBack}
            />
          </TouchableOpacity>
          <View style={styles.mainContent}>
            <Text style={styles.title}>Configurações {'\n'} de hábito</Text>
            <Text style={styles.inputText}>Área</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.area}>{'Mente'}</Text>
            </View>
            <Text style={styles.inputText}>Hábito</Text>
            <SelectHabit />
            <Text style={styles.inputText}>Frequência</Text>
            <SelectFrequency
              habitFrequency={'Diário'}
              frequencyInput={setFrequencyInput}
            />
            {frequencyInput === 'Mensal' ? null : (
              <Notification
                notificationToggle={notificationToggle}
                setNotificationToggle={setNotificationToggle}
              />
            )}

            {notificationToggle ? (
              frequencyInput === 'Mensal' ? null : (
                <TimeDataPicker
                  frequency={frequencyInput}
                  dayNotification={dayNotification}
                  setDayNotification={setDayNotification}
                  setTimeNotification={setTimeNotification}
                />
              )
            ) : null}

            {create === false ? (
              <UpdateExcludeButtons
                handleUpdate={() => {}}
                habitArea={'Mente'}
                habitInput={'A'}
              />
            ) : (
              <View>
                <DefaultButton
                  buttonText={'Criar'}
                  handlePress={() => {}}
                  width={250}
                  height={50}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(21, 21, 21, 0.98)',
  },
  backPageBtn: {
    width: 40,
    height: 40,
    margin: 25,
  },
  arrowBack: {
    width: 40,
    height: 40,
  },
  mainContent: {
    width: 250,
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
  },
  inputText: {
    color: 'white',
    fontSize: 16,
    marginTop: 35,
    marginBottom: 10,
    marginLeft: 5,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  area: {
    color: '#BBBBBB',
    fontSize: 15,
  },
});
