import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Habit from '../../db/HabiDatabase';
import ConfigurationModal from '../../components/HabitConfigurationPage/ConfigurationModal';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../../../App';

type renderItem = {
  item: Habit;
};

export default function HabitsConfiguration() {
  const navigation = useNavigation<StackNavigation>();
  const [habitList, setHabitList] = useState<Habit[]>([]);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const backToHome = () => navigation.navigate('Home');

  const renderItem = ({item}: renderItem) => (
    <TouchableNativeFeedback
      onPress={() => {
        setSelectedHabit(item);
        setModalVisible(true);
      }}>
      <View style={styles.panel}>
        <Text style={styles.panelText}>{item.title}</Text>
        <Image
          style={styles.panelImage}
          source={require('../../assets/icons/menu.png')}
        />
      </View>
    </TouchableNativeFeedback>
  );

  useEffect(() => {
    Habit.getAll().then(it => setHabitList(it));
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backPageBtn} onPress={backToHome}>
          <Image
            source={require('../../assets/icons/arrowBack.png')}
            style={styles.arrowBack}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContent}>
        <Text style={styles.title}>Configurações{'\n'}de Hábitos</Text>
        {habitList.length === 0 ? (
          <Text style={styles.listEmptyText}>Nenhum hábito adicionado.</Text>
        ) : (
          <FlatList data={habitList} renderItem={renderItem} />
        )}
      </View>

      {selectedHabit && (
        <ConfigurationModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          habit={selectedHabit}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(21, 21, 21, 0.98)',
  },
  mainContent: {
    alignSelf: 'center',
    maxWidth: 350,
    minWidth: 300,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    marginBottom: 20,
  },
  listEmptyText: {
    color: '#FFF',
    fontSize: 25,
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
  //renderItem
  panel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e5e5e5',
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
    elevation: 5,
    shadowRadius: 20,
    shadowColor: '#fff',
  },
  panelImage: {
    width: 30,
    height: 30,
  },
  panelText: {
    color: 'rgba(21, 21, 21, 0.98)',
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
