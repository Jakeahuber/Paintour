import React, { useState, useEffect } from 'react';
import {View,StyleSheet,Image,useWindowDimensions, Text} from 'react-native';
import {app} from '../firebaseconfig';
import {getAuth, signInWithCredential, GoogleAuthProvider} from "firebase/auth";
import ErrorModal from './ErrorModal';
import LoadingModal from './LoadingModal';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const auth = getAuth(app);

const SignIn = () => {

  const {height, width} = useWindowDimensions();
  const [errorVisible, setErrorVisible] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      setLoadingVisible(true);
      const {accessToken ,idToken} = await GoogleSignin.getTokens();
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      await signInWithCredential(auth, credential);
    } catch (error) {
      console.log(error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the login flow
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
    setLoadingVisible(false);
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '741911403223-cbo7gju2phsjjqquhvh79tqi6q9d3t1j.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
  }, []);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setloggedIn(false);
      setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <View style={styles.content}>
        <ErrorModal visible={errorVisible} message={"TODO"} onClose={()=>{setErrorVisible(false)}} />
        <Image source={require('../assets/drawing.gif')} style={{width: Math.min(width, height) * 0.9,
                                                                 height: Math.min(width, height) * 0.9}}/>
        <Text style={{fontSize: 24, color: 'white', marginBottom: 20}}>Get started for free!</Text>
        <GoogleSigninButton
  size={GoogleSigninButton.Size.Wide}
  color={GoogleSigninButton.Color.Light}
          onPress={signIn}
        />
        <LoadingModal visible={loadingVisible}/>
      </View>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black', // Set your background color
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: -100
  },
});