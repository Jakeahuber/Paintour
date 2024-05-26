import React, { useState, useEffect } from 'react';
import {View,StyleSheet,Image,useWindowDimensions, Text} from 'react-native';
import {app} from '../firebaseconfig';
import {getAuth, signInWithCredential, GoogleAuthProvider} from "firebase/auth";
import ErrorModal from './ErrorModal';
import LoadingModal from './LoadingModal';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { getUser } from '../api/getUser';

const auth = getAuth(app);

const LoadingPage = () => {

  const navigation = useNavigation();

  const {height, width} = useWindowDimensions();
  const [errorVisible, setErrorVisible] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);

  return (
      <View style={styles.content}>
        <Image source={require('../assets/splash.png')} style={{width: Math.min(width, height) * 0.9,
                                                                 height: Math.min(width, height) * 0.9 * 2.16}}/>                                 
      </View>
  );
}

export default LoadingPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});