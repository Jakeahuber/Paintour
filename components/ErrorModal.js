import React from 'react';
import { View, Text, TouchableWithoutFeedback, Modal, StyleSheet } from 'react-native';

const ErrorModal = ({ visible, message, onClose }) => {
    return (
        <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose}
        >
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.messageText}>{message}</Text>
            </View>
            </View>
        </TouchableWithoutFeedback>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 100,
    },
    modalContent: {
      backgroundColor: 'red',
      width: '100%',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    messageText: {
      fontSize: 20,
      marginBottom: 20,
      color: 'white',
      textAlign: 'center',
    },
  });

export default ErrorModal; 