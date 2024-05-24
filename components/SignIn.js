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

const SignIn = () => {

  const navigation = useNavigation();

  const {height, width} = useWindowDimensions();
  const [errorVisible, setErrorVisible] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);

  const emailHasAccount = async () => {
    const userNotCreatedMsg = "A User with this UID does not exist.";
    try {
      await getUser(auth.currentUser.uid);
    } catch (error) {
      if (error.message === userNotCreatedMsg) {
          return false;
      }
    }
    return true;
  }

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      setLoadingVisible(true);
      const {accessToken, idToken} = await GoogleSignin.getTokens();
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      await signInWithCredential(auth, credential);
      const hasAccount = await emailHasAccount();
      if (!hasAccount) {
        navigation.navigate("SignUp");
      }
    } catch (error) {
      setTimeout(() => {
        setErrorVisible(true)
      }, 500)
    }
    setLoadingVisible(false);
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '741911403223-cbo7gju2phsjjqquhvh79tqi6q9d3t1j.apps.googleusercontent.com',
    });
  }, []);

  return (
      <View style={styles.content}>
        <ErrorModal visible={errorVisible} message={"Could not sign user in."} onClose={()=>{setErrorVisible(false)}} />
        <Image source={require('../assets/drawing.gif')} style={{width: Math.min(width, height) * 0.9,
                                                                 height: Math.min(width, height) * 0.9}}/>
        <Text style={{fontSize: 24, color: 'white', marginBottom: 20}}>Start Drawing Today!</Text>
        <GoogleSigninButton
  size={GoogleSigninButton.Size.Standard}
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
    backgroundColor: 'black',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: -100
  },
});