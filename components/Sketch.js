import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dummyData from '../dummydata';
import { state } from '../state';
import { useSnapshot } from 'valtio';

function Sketch(props) {
    const navigation = useNavigation();
    const snap = useSnapshot(state);
    const { height, width } = useWindowDimensions();


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
        <View style={[styles.postContainer, {width: width}]}> 
            <Image
                style={styles.sketch}
                source={{ uri: props.sketch}}
            />   
            <TouchableOpacity onPress={handleUsernameClick} style={styles.authorContainer}>

                <View style={{flexDirection: 'row', padding: 15}}>
                    <Image
                        style={styles.profilePicture}
                        source={{ uri: props.profilePicture}}
                    />
                    <Text style={styles.uploader}>{props.uploader}</Text> 
                    <Text style={styles.uploadTime}>{props.uploadAgoTime}</Text>     
                </View>
            </TouchableOpacity>                     
        </View>
    );
}

const styles = StyleSheet.create({
    sketch: {
      width: '90%',
      height: undefined,
      aspectRatio: 1,
      borderColor: 'white',
      borderWidth: 1,
    },
    postContainer: {
        marginBottom: 15,
        width: '100%',
        alignItems: 'center',
    },
    profilePicture: {
        width: 40, 
        height: 40, 
        borderRadius: 50, 
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 5,
        borderColor: 'white'
    },
    authorContainer: {
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    uploader: {
        marginLeft: 3, 
        paddingTop: 8, 
        fontSize: 18, 
        justifyContent: 'flex-start',
        color: 'white'
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