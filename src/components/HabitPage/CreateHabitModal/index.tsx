import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import DefaultButton from '../../common/DefaultButton';
import Habit, {createTable} from '../../../db/HabiDatabase';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {getDBConnection} from '../../../db';

interface ModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  habitColor: string;
  habitType: string;
}

const CreateHabitModal = ({
  modalVisible,
  setModalVisible,
  habitColor,
  habitType,
}: ModalProps) => {
  const toggleModal = () => {
    setModalVisible(previousState => !previousState);
  };
  const [title, onChangeTitle] = useState('');
  const [description, onChangeDescription] = useState('');
  const [disable, setDisable] = useState(false);

  const styledModal = styledModalView(habitColor);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.centeredView}>
          <View style={styledModal.modalView}>
            <View style={styles.mainContent}>
              <Text style={styles.modalText}>Criar novo hábito</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Dígite o título do hábito:"
                keyboardType="default"
                placeholderTextColor="#FFFFFF"
              />
              <TextInput
                style={styles.textInput}
                onChangeText={onChangeDescription}
                value={description}
                placeholder="Dígite a descrição do hábito:"
                keyboardType="default"
                multiline={false}
                placeholderTextColor="#FFFFFF"
              />
            </View>

            <DefaultButton
              buttonText="Salvar"
              disabled={disable}
              handlePress={() => {
                if (description === '' || title === '') {
                  Alert.alert(
                    'Erro ao salvar o hábito',
                    'Preencha todos os campos para continuar!',
                  );
                } else {
                  const now = Date.now().toString();
                  const newHabit = new Habit(
                    title,
                    description,
                    now,
                    habitType,
                    uuidv4(),
                  );
                  getDBConnection()
                    .then(db => {
                      setDisable(true);
                      createTable(db);
                      Habit.create(db, newHabit);
                      toggleModal();
                      onChangeDescription('');
                      onChangeTitle('');
                    })
                    .catch(error => {
                      console.error('erro', error);
                    })
                    .finally(() => {
                      setDisable(false);
                    });
                }
              }}
              width={250}
              height={50}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styledModalView = (shadowColor: string) =>
  StyleSheet.create({
    modalView: {
      margin: 20,
      backgroundColor: '#121212',
      borderRadius: 20,
      paddingHorizontal: 35,
      paddingVertical: 20,
      shadowColor: shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 4,
      elevation: 5,
    },
  });

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#18181870',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 45,
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
  },
  textInput: {
    height: 50,
    width: 250,
    color: 'white',
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#FFF',
    padding: 10,
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 45,
  },
});

export default CreateHabitModal;
