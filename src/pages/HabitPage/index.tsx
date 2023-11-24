/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import SelectHabit from '../../components/HabitPage/SelectHabit';
import SelectFrequency from '../../../src/components/HabitPage/SelectFrequency';
import Notification from '../../../src/components/HabitPage/Notification';
import TimeDataPicker from '../../../src/components/HabitPage/TimeDataPicker';
import UpdateExcludeButtons from '../../../src/components/HabitPage/UpdateExcludeButtons';
import DefaultButton from '../../../src/components/common/DefaultButton';
import CreateHabitModal from '../../components/HabitPage/CreateHabitModal';
import Habit from '../../db/HabiDatabase';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList, StackNavigation} from '../../../App';
import CreateHabits from '../../services/HabitsService';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });
export const getHabitColor = (habitArea: string) => {
  let color;

  switch (habitArea) {
    case 'Mente':
      color = '#90B7F3';
      break;
    case 'Financeiro':
      color = '#85BB65';
      break;
    case 'Corpo':
      color = '#FF0044';
      break;
    case 'Humor':
      color = '#FE7F23';
      break;
    default:
      color = '#000000';
      break;
  }

  return color;
};

type HabitPageProps = StackScreenProps<RootStackParamList, 'HabitPage'>;

export default function HabitPage({route}: HabitPageProps) {
  const navigation = useNavigation<StackNavigation>();

  const [habitInput, setHabitInput] = useState('');

  const [frequencyInput, setFrequencyInput] = useState('Diário');
  const [notificationToggle, setNotificationToggle] = useState(false);
  const [dayNotification, setDayNotification] = useState('');
  const [timeNotification, setTimeNotification] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const habitCreated = new Date();

  const formatDate = `${habitCreated.getFullYear()}-${habitCreated.getMonth()}-${habitCreated.getDate()}`;

  const {create, habit} = route.params;

  function handleCreateHabit() {
    if (habitInput === '') {
      Alert.alert('Você precisa selecionar um hábito para continuar');
    } else if (
      notificationToggle === true &&
      frequencyInput === 'Diário' &&
      timeNotification === undefined
    ) {
      Alert.alert('Você precisa dizer o horário da notificação!');
    } else if (
      notificationToggle === true &&
      frequencyInput === 'Diário' &&
      dayNotification === undefined &&
      timeNotification === undefined
    ) {
      Alert.alert(
        'Você precisa dizer a frequência e o horário da notificação!',
      );
    } else {
      CreateHabits.createHabit({
        habitArea: habit?.habitArea,
        habitName: habitInput,
        habitFrequency: frequencyInput,
        habitHasNotification: notificationToggle,
        habitNotificationFrequency: dayNotification,
        habitNotificationTime: timeNotification,
        lastCheck: formatDate,
        daysWithoutChecks: 0,
        habitIsChecked: 0,
        progressBar: 1,
        habitChecks: 0,
      }).then(() => {
        Alert.alert('Sucesso na criação do hábito!');
        navigation.navigate('Home', {
          createHabit: `Created in ${habit?.habitArea}`,
        });
      });
    }
  }

  function handleUpdateHabit() {
    if (notificationToggle === true && !dayNotification && !timeNotification) {
      Alert.alert('Você precisa colocar a frequência e horário da notificação');
    } else {
      CreateHabits.updateHabit({
        habitArea: habit?.habitArea,
        habitName: habitInput,
        habitFrequency: frequencyInput,
        habitHasNotification: notificationToggle,
        habitNotificationFrequency: dayNotification,
        habitNotificationTime: timeNotification,
      }).then(() => {
        Alert.alert('Sucesso na atualização do hábito');
      });
      navigation.navigate('Home', {
        updateHabit: `Updated in ${habit?.habitArea}`,
      });
    }
  }

  function openHabitsConfiguration() {
    navigation.navigate('HabitsConfiguration');
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <CreateHabitModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            habitColor={getHabitColor(habit.habitArea)}
            habitType={habit.habitArea}
          />

          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backPageBtn}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/icons/arrowBack.png')}
                style={styles.arrowBack}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backPageBtn}
              onPress={openHabitsConfiguration}>
              <Image
                source={require('../../assets/icons/settingsIcon.png')}
                style={styles.arrowBack}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.mainContent}>
            <Text style={styles.title}>Seleção {'\n'} de hábito</Text>
            <Text style={styles.inputText}>Área</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.area}>{habit.habitArea}</Text>
            </View>
            <View style={styles.addHabitRow}>
              <Text style={styles.inputText}>Hábito</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Image
                  source={require('../../assets/icons/addCircle.png')}
                  style={styles.addHabitButton}
                />
              </TouchableOpacity>
            </View>
            <SelectHabit
              habitType={habit.habitArea}
              habitInput={setHabitInput}
            />
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
                handleUpdate={handleUpdateHabit}
                habitArea={habit.habitArea}
                habitInput={'A'}
              />
            ) : (
              <View>
                <DefaultButton
                  buttonText={'Criar'}
                  handlePress={handleCreateHabit}
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
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backPageBtn: {
    width: 40,
    height: 40,
    margin: 20,
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
  addHabitRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addHabitButton: {
    width: 30,
    height: 30,
    marginTop: 35,
    marginBottom: 10,
  },
});
