import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingModal = ({ visible }) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {}} 
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ActivityIndicator size="large" color="white" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
    width: '100%',
  },
  modalContent: {
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
});

export default LoadingModal;