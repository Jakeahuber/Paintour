import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Image, Keyboard, TouchableOpacity, Modal } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { initializeAuth, getAuth, createUserWithEmailAndPassword, getReactNativePersistence, signInWithEmailAndPassword  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ErrorModal from './ErrorModal';

import { state } from '../state';
import {app} from '../firebaseconfig'

const auth = getAuth(app);

const SignIn = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const signIn = () => {
    //setError('Invalid email or password. Please try again.');
    //setModalVisible(true);
    signInWithEmailAndPassword(auth,  email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("User signed in");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      if (errorCode == 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      }
      else if (errorCode == 'auth/missing-password') {
        setError('Please enter a password.')
      }
      else if (errorCode == 'auth/invalid-credential') {
        setError('Invalid email address or password. Please try again.')
      }
      else if (errorCode == 'auth/invalid-email-verified') {
        setError('Email is not verified.');
      }
      else {
        setError('An unexpected error occurred.');
      }

      setModalVisible(true);

    });
  }

  const handleEmailChange = (input) => {
    setEmail(input);
  };
  
  const handlePasswordChange = (input) => {
    setPassword(input);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.content}>
          <ErrorModal visible={modalVisible} message={error} onClose={closeModal} />
          <Image source={require('../signup.gif')} style={styles.image}/>
          <Input
            label=""
            placeholder="Enter your email address"
            value={email}
            onChangeText={handleEmailChange}
            leftIcon={{ type: 'font-awesome', name: 'envelope', color: 'white', marginHorizontal: 5 }}
            inputStyle={{color: 'white'}}
            labelStyle={{color: 'white'}}
          />
          <Input
            label=""
            placeholder="Enter your password"
            value={password}
            onChangeText={handlePasswordChange}
            leftIcon={{ type: 'font-awesome', name: 'lock', color: 'white', marginHorizontal: 10 }}
            rightIcon={
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Text style={{color: 'white', fontSize: 16}}>
                  {isPasswordVisible ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            }
            inputStyle={{color: 'white'}}
            labelStyle={{color: 'white'}}
            secureTextEntry={!isPasswordVisible} 
          />
          <Button
              title="Sign In"
              onPress={signIn}
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
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={{color: 'white', marginTop: 15}}>New? Sign Up</Text>
            </TouchableOpacity>
        </View>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black', // Set your background color
  },
  content: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 100
  },
  image: {
    width: 275,
    height: 275,
  }
});