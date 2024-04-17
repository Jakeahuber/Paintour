import { useState } from 'react';
import { Button, Image, View, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { state } from '../state';
import { useSnapshot } from 'valtio';
import { signOut, getAuth } from 'firebase/auth';
import {app} from '../firebaseconfig';

const auth = getAuth(app);

const EditProfile = (props) => {
  const snap = useSnapshot(state);

  const image = snap.profilePicture;
  const [uploadedImage, setUploadedImage] = useState(false);

  const handleSignOut = async () => {
    signOut(auth)
    .then(() => {
      console.log('User signed out successfully.');
    })
    .catch((error) => {
      console.error('Error signing out:', error);
    });
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      //setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
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
