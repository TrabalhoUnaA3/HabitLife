import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import LifeStatus from '../../../src/components/common/LifeStatus';
import StatusBar from '../../../src/components/home/StatusBar';
import CreateHabit from '../../../src/components/home/createHabit';
import EditHabit from '../../../src/components/home/EditHabit';
import DefaultButton from '../../../src/components/common/DefaultButton';

export default function Home() {
  const robotDaysLife = '01';
  const checks = 1;
  const gameOver = false;

  const mindHabit = null;
  const moneyHabit = null;
  const bodyHabit = null;
  const funHabit = null;

  function handleGameOver() {
    // Lógica para reiniciar o jogo
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          {!gameOver ? (
            <Text style={styles.dailyChecks}>
              ❤️ {robotDaysLife} {robotDaysLife === '01' ? 'dia' : 'dias'}- ✔️{' '}
              {checks} {checks === 1 ? 'Check' : 'Checks'}
            </Text>
          ) : (
            <Text style={styles.gameOverTitle}>Game Over</Text>
          )}
          <LifeStatus />
          <StatusBar mindHabit={1} moneyHabit={1} bodyHabit={1} funHabit={1} />

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
                  // handleNavExplanation();
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
