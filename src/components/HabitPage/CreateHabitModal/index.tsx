import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View, TextInput} from 'react-native';
import DefaultButton from '../../common/DefaultButton';

interface ModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  habitColor: string;
}

var shadowColor = '#FFF';

const CreateHabitModal = ({
  modalVisible,
  setModalVisible,
  habitColor,
}: ModalProps) => {
  const toggleModal = () => {
    setModalVisible(previousState => !previousState);
  };
  const [title, onChangeTitle] = useState('');
  const [description, onChangeDescription] = useState('');

  shadowColor = habitColor;

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.mainContent}>
              <Text style={styles.modalText}>Criar novo hábito</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Dígite o título do hábito:"
                keyboardType="default"
              />
              <TextInput
                style={styles.textInput}
                onChangeText={onChangeDescription}
                value={description}
                placeholder="Dígite a descrição do hábito:"
                keyboardType="default"
                multiline={false}
              />
            </View>

            <DefaultButton
              buttonText="Salvar"
              handlePress={toggleModal}
              width={250}
              height={50}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgba(25, 25, 25, 1)',
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
