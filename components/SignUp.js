import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import ErrorModal from './ErrorModal';

import {app} from '../firebaseconfig'

const auth = getAuth(app);

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      user.updateProfile({
        displayName: username,
        photoURL: "https://i.pinimg.com/236x/2a/d8/5a/2ad85ad72c5776fc2c3cfbfbe45b3906.jpg"
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        setError('Username is already taken.');
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      if (errorCode == 'auth/invalid-email') setError('Please enter a valid email address.');
      else if (errorCode == 'auth/missing-password') setError('Please enter a password.')
      else if (errorCode == 'auth/invalid-credential') setError('Invalid email address or password. Please try again.')
      else if (errorCode == 'auth/invalid-email-verified') setError('The provided email is not verified.');
      else if (errorCode == 'auth/email-already-exists') setError('The provided email is already in use by an existing user.')
      else if (errorCode == 'auth/invalid-display-name') setError("The provided username is invalid.");
      else if (errorCode == 'auth/weak-password') setError("Password must contain at least 6 characters.");
      else setError('An unexpected error occurred.');
      setModalVisible(true);
    });
  }

  const handleUsernameChange = (input) => {
    setUsername(input);
  };

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

  const handleSignIn = () => {
    navigation.navigate("SignIn");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.content}>
          <ErrorModal visible={modalVisible} message={error} onClose={closeModal} />
          <Input
            label=""
            placeholder="Choose a username"
            value={username}
            onChangeText={handleUsernameChange}
            leftIcon={{ type: 'font-awesome', name: 'user', color: 'white', marginHorizontal: 8 }}
            inputStyle={{color: 'white'}}
            labelStyle={{color: 'white'}}
          />
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
              title="Sign Up"
              onPress={signUp}
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
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={{color: 'white', marginTop: 15}}>Existing User? Sign In</Text>
            </TouchableOpacity>
        </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black', // Set your background color
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingTop: 70
  },
  image: {
    width: 300,
    height: 300,
  }
});