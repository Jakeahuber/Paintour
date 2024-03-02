import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { state } from '../state';

const PhoneVerificationScreen = ({ route }) => {
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerificationSubmit = () => {
    // Validate and process the verification code, e.g., send it to a server for verification
    console.log('Submitted Verification Code:', verificationCode);
    state.isSignedIn = true;
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Enter Verification Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Verification Code"
          keyboardType="numeric"
          value={verificationCode}
          onChangeText={(text) => setVerificationCode(text)}
        />
        <Button title="Submit" onPress={handleVerificationSubmit} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    color: 'white'
  },
});

export default PhoneVerificationScreen;