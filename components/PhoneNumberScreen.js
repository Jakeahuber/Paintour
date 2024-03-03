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

    const handlePhoneNumberChange = (input) => {
      const cleanedInput = input.replace(/\D/g, '');  
      let formattedNumber = '';
      if (cleanedInput.length <= 3) {
        formattedNumber = `${cleanedInput}`;
      } else if (cleanedInput.length <= 6) {
        formattedNumber = `(${cleanedInput.slice(0, 3)}) ${cleanedInput.slice(3)}`;
      } else {
        formattedNumber = `(${cleanedInput.slice(0, 3)}) ${cleanedInput.slice(3, 6)}-${cleanedInput.slice(6)}`;
      }
  
      setPhoneNumber(formattedNumber);
    };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Input
            label=""
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            leftIcon={{ type: 'font-awesome', name: 'phone', color: 'white' }}
            inputStyle={{color: 'white'}}
            labelStyle={{color: 'white'}}
          />
          <Button
              title="Sign In"
              onPress={handlePhoneNumberSubmit}
              titleStyle={{ fontWeight: '700', color: 'black' }}
              buttonStyle={{
                backgroundColor: 'rgba(244, 244, 244, 1)',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 5,
              }}
              containerStyle={{
                width: 200,
                height: 45,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
            />
          <Text style={{color: 'white', marginTop: 15}}>New? Sign Up</Text>
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
  },
});