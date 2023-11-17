import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import DefaultButton from '../../../src/components/common/DefaultButton';
import ExplanationCard from '../../../src/components/explanation/ExplanationCard';
import {useNavigation} from '@react-navigation/native';
import ChangeNavigationService from '../../services/ChangeNavigationService';
import {StackNavigation} from '../../../App';

export default function AppExplanation() {
  const navigation = useNavigation<StackNavigation>();
  const [showHome, setShowHome] = useState('false');
  const startDate = new Date();
  const month = `${startDate.getMonth() + 1}`.padStart(2, '0');
  const day = `${startDate.getDate()}`.padStart(2, '0');
  const appStartData = `${startDate.getFullYear()}-${month}-${day}`;

  function handleNavHome() {
    navigation.navigate('Home');
  }

  async function HandleSetShowHome() {
    if (showHome !== 'true') {
      await ChangeNavigationService.setShowHome({
        showHome: 'true',
        appStartData,
      })
        .then(() => {
          console.log(`Sucesso! ${showHome} ${appStartData}`);
        })
        .catch(err => console.error(err));

      handleNavHome();
    }
  }

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
            handlePress={HandleSetShowHome}
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
    marginTop: 20,
    marginBottom: 10,
  },

  description: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
});
