import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import DefaultButton from '../../../src/components/common/DefaultButton';
import ExplanationCard from '../../../src/components/explanation/ExplanationCard';

export default function AppExplanation() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>
            Antes, deixa {'\n'} eu te explicar...
          </Text>
          <ExplanationCard />
          <Text style={styles.descriptionCta}>
            Pronto(a) para subir de nível na vida?
          </Text>
          <Text style={styles.description}>
            Na próxima tela você irá poder escolher {'\n'} seus 4 hábitos de
            forma individual.
          </Text>
          <DefaultButton
            buttonText={'Continuar'}
            handlePress={() => {}}
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 40,
  },

  descriptionCta: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    margintop: 20,
    marginBottom: 10,
  },

  description: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
});
