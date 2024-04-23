import { useState } from 'react';
import { Button, Image, View, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { state } from '../state';
import { useSnapshot } from 'valtio';
import { signOut, getAuth } from 'firebase/auth';
import {app} from '../firebaseconfig';
import ErrorModal from './ErrorModal'

const auth = getAuth(app);

const EditProfile = (props) => {
  const snap = useSnapshot(state);
  const [modalVisible, setModalVisible] = useState(false);

  const image = snap.profilePicture;
  const [uploadedImage, setUploadedImage] = useState(false);
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
      const img = await uriToBase64(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <ErrorModal visible={modalVisible} message={error} onClose={closeModal} />
      <Image source={{ uri: image }} style={styles.profilePicture} />
      <Button title="Change Profile Picture" onPress={pickImage} />
      <Button title="Log Out" onPress={handleSignOut}/>
      <Button title="Save Changes" />
      <Text style={{color: 'white'}}>Other concern? Contact doolee@gmail.com.</Text>
    </View>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePicture: {
    width: 125, 
    height: 125, 
    borderRadius: 125 / 2, 
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: 'white',
},
});
