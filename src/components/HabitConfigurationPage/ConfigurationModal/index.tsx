import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import 'react-native-get-random-values';
import Habit from '../../../db/HabiDatabase';
import {getHabitColor} from '../../../pages/HabitPage';
import {useToast} from 'react-native-toast-notifications';

interface ModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  habit: Habit;
}

const ConfigurationModal = ({
  modalVisible,
  setModalVisible,
  habit,
}: ModalProps) => {
  const toggleModal = () => {
    resetModalState();
    setModalVisible(previousState => !previousState);
  };
  const [disable, setDisable] = useState(false);
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(habit.title);
  const [description, setDescription] = useState(habit.description);

  const toast = useToast();

  function formatTimestamp(timestamp: string) {
    const date = new Date(parseInt(timestamp));

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  }

  const resetModalState = () => {
    setDisable(false);
    setEditable(false);
    setTitle(habit.title);
    setDescription(habit.description);
  };

  useEffect(resetModalState, [modalVisible, habit]);

  const styledModal = styledModalView(getHabitColor(habit.habitType));

  const handleDelete = async () => {
    setDisable(true);
    Alert.alert(
      'Exclusão de hábito',
      `Deseja mesmo excluir o hábito ${habit.title}?`,
      [
        {
          text: 'Não',
          onPress: () => {
            console.log('Exclusão cancelada');
          },
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            await Habit.delete(habit.id)
              .then(() => {
                toast.show('Exclusão realizada com sucesso', {
                  type: 'success',
                  placement: 'bottom',
                  duration: 4000,
                  animationType: 'slide-in',
                });
              })
              .catch(err => {
                console.error(err);
                toast.show('Algo deu errado', {
                  type: 'danger',
                  placement: 'bottom',
                  duration: 4000,
                  animationType: 'slide-in',
                });
              })
              .finally(() => {
                toggleModal();
                setDisable(false);
              });
          },
        },
      ],
    );
  };

  const handleUpdate = async () => {
    if (!editable) {
      setEditable(true);
    } else {
      Alert.alert(
        'Edição de hábito',
        `Deseja mesmo editar o hábito ${habit.title}?`,
        [
          {
            text: 'Não',
            onPress: () => {
              console.log('Exclusão cancelada');
            },
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: async () => {
              setDisable(true);
              const newHabit = new Habit(
                title,
                description,
                habit.createdAt,
                habit.habitType,
                habit.id,
              );
              await Habit.update(newHabit)
                .then(() => {
                  toast.show('Edição realizada com sucesso', {
                    type: 'success',
                    placement: 'bottom',
                    duration: 4000,
                    animationType: 'slide-in',
                  });
                })
                .catch(err => {
                  console.error(err);
                  toast.show('Algo deu errado', {
                    type: 'danger',
                    placement: 'bottom',
                    duration: 4000,
                    animationType: 'slide-in',
                  });
                })
                .finally(() => {
                  toggleModal();
                  setDisable(false);
                });
            },
          },
        ],
      );
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.centeredView}>
            <View
              style={styledModal.modalView}
              onStartShouldSetResponder={() => true}>
              <View style={styles.mainContent}>
                <Text style={styles.modalText}>Gerenciar Hábito</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Título:</Text>
                    <TextInput
                      style={[editable ? styles.input : styles.inputUnEditable]}
                      value={title}
                      scrollEnabled={true}
                      editable={editable}
                      numberOfLines={1}
                      onChangeText={setTitle}
                    />
                  </View>
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Descrição:</Text>
                    <TextInput
                      style={[editable ? styles.input : styles.inputUnEditable]}
                      value={description}
                      scrollEnabled={true}
                      editable={editable}
                      numberOfLines={1}
                      onChangeText={setDescription}
                    />
                  </View>
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Tipo:</Text>
                    <TextInput
                      style={styles.input}
                      value={habit.habitType}
                      editable={false}
                    />
                  </View>
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Criado em:</Text>
                    <TextInput
                      style={styles.input}
                      value={formatTimestamp(habit.createdAt)}
                      editable={false}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.footerRow}>
                <TouchableOpacity disabled={disable} onPress={handleDelete}>
                  <Image
                    source={require('../../../assets/icons/whiteTrash.png')}
                    style={styles.iconButton}
                  />
                </TouchableOpacity>

                <TouchableOpacity disabled={disable} onPress={handleUpdate}>
                  {editable ? (
                    <Image
                      source={require('../../../assets/icons/floppy-disk.png')}
                      style={styles.iconButton}
                    />
                  ) : (
                    <Image
                      source={require('../../../assets/icons/edit.png')}
                      style={styles.iconButton}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
    backgroundColor: '#10101090',
  },
  modalText: {
    marginBottom: 45,
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    maxWidth: 250,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    color: 'white',
  },
  inputUnEditable: {
    height: 40,
    maxWidth: 250,
    borderColor: '#ff5733',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    color: 'white',
  },
  inputColumn: {
    marginBottom: 10,
  },
  footerRow: {
    display: 'flex',
    flexDirection: 'row',
    width: 250,
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 50,
    height: 50,
  },
});

export default ConfigurationModal;
