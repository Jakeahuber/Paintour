import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dummyData from '../dummydata';
import { state } from '../state';
import { useSnapshot } from 'valtio';

function Sketch(props) {
    const navigation = useNavigation();
    const snap = useSnapshot(state);

    const handleUsernameClick = () => {
        if (props.uploader == snap.username) {
            navigation.goBack();
        }
        else {
            navigation.navigate('Profile', { username: dummyData.username2, profilePicture: 
                dummyData.profilePicture2, numFriends: dummyData.numFriends2, numSketches: dummyData.numSketches2, 
                streak: dummyData.streak2, sketches: dummyData.mySketches2});
        }
    };

    return (
        <View style={styles.postContainer}>           
            <TouchableOpacity onPress={handleUsernameClick} style={styles.authorContainer}>
                <Image
                    style={styles.profilePicture}
                    source={{ uri: props.profilePicture}}
                />
                <Text style={styles.uploader}>{props.uploader}</Text> 
                <Text style={styles.uploadTime}>{props.uploadAgoTime}</Text>     
            </TouchableOpacity>                     
            <Image
                style={styles.sketch}
                source={{ uri: props.sketch}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    sketch: {
      width: '90%',
      height: undefined,
      aspectRatio: 1,
      borderWidth: 1,
      borderColor: 'white',
    },
    postContainer: {
        marginBottom: 15,
        marginTop: 15,
        width: '100%',
        alignItems: 'center',
    },
    profilePicture: {
        width: 40, 
        height: 40, 
        borderRadius: 50, 
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: 'white',
    },
    authorContainer: {
        flexDirection: 'row',
        width: '100%',
        marginRight: 'auto',
        marginBottom: 5,
        marginTop: 5,
    },
    uploader: {
        marginLeft: 3, 
        paddingTop: 8, 
        fontSize: 18, 
        color: 'white', 
        justifyContent: 'flex-start'
    },
    likes: {
        marginLeft: 3, 
        paddingTop: 4, 
        fontSize: 18, 
        color: 'white', 
        justifyContent: 'flex-start'
    },
    uploadTime: {
        marginLeft: 3, 
        fontSize: 14, 
        paddingTop: 12, 
        justifyContent: 'flex-end', 
        color: '#b5b5b5'
    }
});

export default Sketch;