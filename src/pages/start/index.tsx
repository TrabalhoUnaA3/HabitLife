import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import DefaultButton from '../../../src/components/common/DefaultButton';

import LifeStatus from '../../../src/components/common/LifeStatus';
import {StackNavigation} from '../../../App';
import {useNavigation} from '@react-navigation/native';

export default function Start() {
  const navigation = useNavigation<StackNavigation>();

  const handleNaveAppExplanation = () => {
    navigation.navigate('AppExplanation');
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>HabitLife</Text>
          <LifeStatus />
          <Text style={styles.description}>
            Vamos transformar sua vida {'\n'} em jogo, buscando sempre {'\n'} o
            melhor nível
          </Text>

          <DefaultButton
            buttonText={'Continuar'}
            handlePress={handleNaveAppExplanation}
            width={250}
            height={50}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(21, 21, 21, .98)',
  },

  title: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: 'bold',
    height: 60,
    marginTop: 60,
    marginBottom: 20,
  },

  description: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 60,
  },
});
