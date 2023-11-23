import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import LifeStatus from '../../../src/components/common/LifeStatus';
import StatusBar from '../../../src/components/home/StatusBar';
import CreateHabit from '../../../src/components/home/createHabit';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList, StackNavigation} from '../../../App';
import ChangeNavigationService from '../../services/ChangeNavigationService';
import CreateHabits from '../../services/HabitsService';
import {StackScreenProps} from '@react-navigation/stack';
import EditHabit from '../../components/home/EditHabit';
import CheckService from '../../services/CheckService';
import DefaultButton from '../../components/common/DefaultButton';

type HabitPageProps = StackScreenProps<RootStackParamList, 'Home'>;

export default function Home({route}: HabitPageProps) {
  const navigation = useNavigation<StackNavigation>();
  const [mindHabit, setMindHabit] = useState<CreateHabits | null>();
  const [moneyHabit, setMoneyHabit] = useState<CreateHabits | null>();
  const [bodyHabit, setBodyHabit] = useState<CreateHabits | null>();
  const [funHabit, setFunHabit] = useState<CreateHabits | null>();
  const [checks, setChecks] = useState<number>();
  const [gameOver, setGameOver] = useState(false);
  const [robotDaysLife, setRobotDaysLife] = useState<string>();

  function handleNavExplanation() {
    navigation.navigate('AppExplanation');
  }
  function handleGameOver() {
    navigation.navigate('Start');
  }

  const excludeArea = route.params?.excludeArea;

  useEffect(() => {
    const today = new Date();

    CreateHabits.findByArea('Mente').then(mind => {
      setMindHabit(mind[0]);
    });
    CreateHabits.findByArea('Financeiro').then(money => {
      setMoneyHabit(money[0]);
    });
    CreateHabits.findByArea('Corpo').then(body => {
      setBodyHabit(body[0]);
    });
    CreateHabits.findByArea('Humor').then(fun => {
      setFunHabit(fun[0]);
    });

    if (excludeArea) {
      if (excludeArea === 'Mente') {
        setMindHabit(null);
      }
      if (excludeArea === 'Financeiro') {
        setMoneyHabit(null);
      }
      if (excludeArea === 'Corpo') {
        setBodyHabit(null);
      }
      if (excludeArea === 'Humor') {
        setFunHabit(null);
      }
    }

    ChangeNavigationService.checkShowHome(1).then(showHome => {
      const month = `${today.getMonth() + 1}`.padStart(2, '0');
      const day = `${today.getDate()}`.padStart(2, '0');
      const formDate = `${today.getFullYear()}-${month}-${day}`;
      console.log('Today:', today);
      console.log('Formatted Date:', formDate);
      console.log('showHome.appStartData:', showHome.appStartData);
      const checkDays =
        new Date(formDate).valueOf() -
        new Date(showHome.appStartData).valueOf() +
        1;
      console.log('Check Days:', checkDays);
      if (checkDays === 0) {
        setRobotDaysLife(checkDays.toString().padStart(2, '0'));
      } else {
        setRobotDaysLife(
          parseInt(String(checkDays / (1000 * 3600 * 24))).toString(),
        );
      }
    });
  }, [route.params, excludeArea]);

  useEffect(() => {
    CheckService.removeCheck(mindHabit, moneyHabit, bodyHabit, funHabit);
    CheckService.checkStatus(mindHabit, moneyHabit, bodyHabit, funHabit);
    const mindChecks = mindHabit ? mindHabit?.habitChecks : 0;
    const moneyChecks = moneyHabit ? moneyHabit?.habitChecks : 0;
    const bodyChecks = bodyHabit ? bodyHabit?.habitChecks : 0;
    const funChecks = funHabit ? funHabit?.habitChecks : 0;
    setChecks(mindChecks + moneyChecks + bodyChecks + funChecks);
    if (
      mindHabit?.progressBar === 0 ||
      moneyHabit?.progressBar === 0 ||
      bodyHabit?.progressBar === 0 ||
      funHabit?.progressBar === 0
    ) {
      setGameOver(true);
    }
  }, [mindHabit, moneyHabit, bodyHabit, funHabit]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          {!gameOver ? (
            <Text style={styles.dailyChecks}>
              ❤️ {robotDaysLife} {robotDaysLife === '01' ? 'dia' : 'dias'} - ✔️{' '}
              {checks} {checks === 1 ? 'Check' : 'Checks'}
            </Text>
          ) : (
            <Text style={styles.gameOverTitle}>Game Over</Text>
          )}
          <LifeStatus
            mindHabit={mindHabit}
            moneyHabit={moneyHabit}
            bodyHabit={bodyHabit}
            funHabit={funHabit}
          />
          <StatusBar
            mindHabit={mindHabit?.progressBar}
            moneyHabit={moneyHabit?.progressBar}
            bodyHabit={bodyHabit?.progressBar}
            funHabit={funHabit?.progressBar}
          />
          {!gameOver ? (
            <View>
              {mindHabit ? (
                <EditHabit habit={mindHabit} checkColor="#90B7F3" />
              ) : (
                <CreateHabit habitArea="Mente" borderColor="#90B7F3" />
              )}
              {moneyHabit ? (
                <EditHabit habit={moneyHabit} checkColor="#85BB65" />
              ) : (
                <CreateHabit habitArea="Financeiro" borderColor="#85BB65" />
              )}
              {bodyHabit ? (
                <EditHabit habit={bodyHabit} checkColor="#FF0044" />
              ) : (
                <CreateHabit habitArea="Corpo" borderColor="#FF0044" />
              )}
              {funHabit ? (
                <EditHabit habit={funHabit} checkColor="#FE7F23" />
              ) : (
                <CreateHabit habitArea="Humor" borderColor="#FE7F23" />
              )}

              <Text
                style={styles.explanationText}
                onPress={() => {
                  handleNavExplanation();
                }}>
                Ver explicações novamente
              </Text>
            </View>
          ) : (
            <View style={{marginVertical: 40}}>
              <DefaultButton
                buttonText={'Resetar o Game'}
                handlePress={handleGameOver}
                width={250}
                height={50}
              />
            </View>
          )}
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

  dailyChecks: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 40,
  },

  explanationText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 25,
  },
  gameOverTitle: {
    marginVertical: 25,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
