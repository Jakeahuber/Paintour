import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const VerifyClickModal = ({ modalVisible, message, onCancel, onConfirm, confirmText }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text testID="messageText" style={styles.modalText}>{message}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={onCancel}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={onConfirm}
              >
                <Text style={styles.textStyle}>{confirmText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  button: {
    borderRadius: 50,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: '#4681f4',
  },
  buttonConfirm: {
    backgroundColor: '#dd7973',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default VerifyClickModal;