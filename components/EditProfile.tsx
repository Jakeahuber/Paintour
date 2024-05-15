import { useState } from 'react';
import { Button, Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { state } from '../state';
import { useSnapshot } from 'valtio';
import { signOut, getAuth } from 'firebase/auth';
import {app} from '../firebaseconfig';
import * as FileSystem from 'expo-file-system';
import ErrorModal from './ErrorModal'
import VerifyClickModal from './VerifyClickModal';
import uploadProfilePicture from '../api/uploadProfilePicture';
import { useNavigation } from '@react-navigation/native';

const auth = getAuth(app);

const EditProfile = () => {
  const navigation = useNavigation();
  const snap = useSnapshot(state);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSignOut = async () => {
    signOut(auth)
    .then(() => {
      console.log('User signed out successfully.');
    })
    .catch((error) => {
      console.error('Error signing out:', error);
      setError("Could not sign user out.");
      setModalVisible(true);
    });
    setSignOutModalVisible(false);
  }

  const pickImage = async () => {
    navigation.navigate("DrawProfilePic");
  };

  const [signOutModalVisible, setSignOutModalVisible] = useState(false);


  return (
    <View style={styles.container}>
      <Image source={{ uri: snap.profilePicture }} style={styles.profilePicture} />
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={{color: 'white', fontSize: 15}}>Draw New Profile Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSignOutModalVisible(true)} style={styles.button}>
          <Text style={{color: 'white', fontSize: 15}}>Log Out</Text>
        </TouchableOpacity>
      <Text style={{color: 'white', fontSize: 15, marginTop: 10, textAlign: "center"}}>For Any Other Concerns, Please Contact doolee@gmail.com.</Text>
      <ErrorModal visible={modalVisible} message={error} onClose={closeModal} />
      <VerifyClickModal
        modalVisible={signOutModalVisible}
        message="Are you sure you want to log out?"
        onCancel={() => setSignOutModalVisible(false)}
        onConfirm={() => handleSignOut()}
        confirmText={"Log Out"}
      />
    </View>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 40
  },
  profilePicture: {
    width: 125, 
    height: 125, 
    borderRadius: 125 / 2, 
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    backgroundColor: 'white'
},
button: {
  backgroundColor: '#4681f4',
  borderRadius: 50,
  padding: 10,
  margin: 10
}
});
