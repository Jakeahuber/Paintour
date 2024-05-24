import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback,
    Keyboard,TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import ErrorModal from './ErrorModal';
import { createUser } from '../api/createUser';
import LoadingModal from './LoadingModal';
import { state } from '../state';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
        await createUser(username);
        state.forceUserReload = !state.forceUserReload;
    } catch (error) {
        const usernameTaken = "Username is already in use.";
        const invalidUsername = "Username must contain only letters, numbers, dots, and underscores, and must be between 3-18 characters.";
        if (error.message === usernameTaken) {
            setError(error.message);
        } else if (error.message === invalidUsername) {
            setError(error.message);
        }
        else {
            setError("Could not create user. Please try again later.");
        }
        setTimeout(() => {
            setErrorVisible(true);
        }, 500)
    }
    setLoading(false);
  }

  const handleUsernameChange = (input) => {
    setUsername(input);
  };

  const closeModal = () => {
    setErrorVisible(false);
  };

  const handleSignIn = () => {
    navigation.navigate("SignIn");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.content}>
          <Input
            label=""
            placeholder="Choose a username"
            value={username}
            onChangeText={handleUsernameChange}
            leftIcon={{ type: 'font-awesome', name: 'user', color: 'white', marginHorizontal: 8 }}
            inputStyle={{color: 'white'}}
            labelStyle={{color: 'white'}}
          />
          <Button
              title="Create Account"
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
            <ErrorModal visible={errorVisible} message={error} onClose={closeModal} />
            <LoadingModal visible={loading} />
        </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
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
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
  modalContent: {
    backgroundColor: 'red',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
});