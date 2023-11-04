import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import LifeStatus from '../../../src/components/common/LifeStatus';
import StatusBar from '../../../src/components/home/StatusBar';
import CreateHabit from '../../../src/components/home/createHabit';

export default function Home() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.dailyChecks}>{'❤️ 5 dias - ✔️ 0 Checks'}</Text>
          <LifeStatus />
          <StatusBar mindHabit={1} moneyHabit={1} bodyHabit={1} funHabit={1} />
          <View>
            <CreateHabit habitArea="Mente" borderColor="#90B7F3" />
            <CreateHabit habitArea="Financeiro" borderColor="#85BB65" />
            <CreateHabit habitArea="Corpo" borderColor="#FF0044" />
            <CreateHabit habitArea="Humor" borderColor="#FE7F23" />

            <Text
              style={styles.explanationText}
              onPress={() => {
                // handleNavExplanation();
              }}>
              Ver explicações novamente
            </Text>
          </View>
          {/* <View style={{marginVertical: 40}}>
            <DefaultButton
              buttonText={'Resetar o Game'}
              handlePress={handleGameOver}
              width={250}
              height={50}
            />
          </View> */}
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
