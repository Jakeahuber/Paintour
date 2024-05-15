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

const auth = getAuth(app);

const EditProfile = (props) => {
  const snap = useSnapshot(state);
  const [modalVisible, setModalVisible] = useState(false);

  const [image, setImage] = useState(state.profilePicture);
  const [uploadedImage, setUploadedImage] = useState(false);
  const [error, setError] = useState("");

  const closeModal = () => {
    setModalVisible(false);
  };

  const saveChanges = async () => {
    return;
  }

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

  const uriToBase64 = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
      });
    } catch (error) {
      console.error('Could not upload image.', error);
      setError("Could not upload image.");
      setModalVisible(true);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0]);
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log(base64);
    }
  };

  const [signOutModalVisible, setSignOutModalVisible] = useState(false);


  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.profilePicture} />
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={{color: 'white', fontSize: 15}}>Change Profile Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSignOutModalVisible(true)} style={styles.button}>
          <Text style={{color: 'white', fontSize: 15}}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveChanges} style={styles.button}>
          <Text style={{color: 'white', fontSize: 15}}>Save Changes</Text>
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
    marginBottom: 10
},
button: {
  backgroundColor: '#4681f4',
  borderRadius: 50,
  padding: 10,
  margin: 10
}
});
