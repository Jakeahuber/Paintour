import { useState } from 'react';
import { Button, Image, View, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = (props) => {
  const [image, setImage] = useState(props.profilePicture);
  const [uploadedImage, setUploadedImage] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.profilePicture} />
      <Button title="Change Profile Picture" onPress={pickImage} />
      <Button title="Log Out" />
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
