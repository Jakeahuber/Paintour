import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input, Button } from 'react-native-elements';

const PhoneNumberScreen = ({ navigation }) => {

    const [phoneNumber, setPhoneNumber] = useState('');

    const handlePhoneNumberSubmit = () => {
        // Do something with the submitted phone number
        console.log('Submitted Phone Number:', phoneNumber);
        navigation.navigate('PhoneVerificationScreen', { phoneNumber: phoneNumber });
    };

    const handleInputChange = (text) => {
        // Basic phone number validation (you can customize it based on your needs)
        const formattedPhoneNumber = text.replace(/[^\d]/g, '');
        setPhoneNumber(formattedPhoneNumber);
      };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Input
            label="Sign Up / Sign In"
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={handleInputChange}
            leftIcon={{ type: 'font-awesome', name: 'phone', color: 'white' }}
            inputStyle={{color: 'white'}}
            labelStyle={{color: 'white'}}
          />
          <Button title="Submit" onPress={handlePhoneNumberSubmit} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PhoneNumberScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Set your background color
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});