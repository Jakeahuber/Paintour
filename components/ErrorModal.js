import React from 'react';
import { View, Text, TouchableWithoutFeedback, Modal, StyleSheet, Pressable } from 'react-native';

const ErrorModal = ({ visible, message, onClose }) => {
    return (
        <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose}
        >
        <Pressable onPress={onClose}>
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text testID="errorMessage" style={styles.messageText}>{message}</Text>
            </View>
            </View>
        </Pressable>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalContainer: {
      alignItems: 'center',
      paddingTop: 100,
      height: '100%',
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