import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Image, Keyboard, TouchableOpacity, Modal } from 'react-native';
import { Input, Button } from 'react-native-elements';
import {app} from '../firebaseconfig'
import {getAuth, signInWithCredential, GoogleAuthProvider, signInWithEmailAndPassword, isSignInWithEmailLink} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ErrorModal from './ErrorModal';

import { state } from '../state';
import LoadingModal from './LoadingModal';

const auth = getAuth(app);

const SignIn = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  
  const signIn = () => {
    setLoadModalVisible(true);

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
    setLoadModalVisible(false);
  }

  /*
 const signIn = () => {

  try {
    const result = await Expo.Google.logInAsync({
      iosClientId: "Your Client ID",
      scopes: ["profile", "email"]
    })
    if (result.type === "success") {
      const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
         firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function(result){
          console.log(result);
         });
        }
      } catch (e) {
        console.log("error", e)
      }
    }

  console.log("enter");
  const credential = signInWithCredential(auth, credential)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const { user } = result;
    const idToken = credential.idToken;
    return { credential, idToken, user };
  })
  .catch((error) => {
    // Handle Errors here.
    // const errorCode = error.code
    // const errorMessage = error.message
    // The email of the user's account used.
    // const {email} = error.customData
    // The AuthCredential type that was used.
    // const credential =
    //    GoogleAuthProvider.credentialFromError(error)
    // ...
    console.log(error);
  });
 }
 */

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

  const [loadModalVisible, setLoadModalVisible] = useState(false);

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
            <LoadingModal visible={loadModalVisible}/>
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