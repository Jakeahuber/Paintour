import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { state } from '../state';
import {getUser} from '../api/getUser';
import { useSnapshot } from 'valtio';
import LoadingModal from './LoadingModal';
import ErrorModal from './ErrorModal';

function Sketch(props) {
    const navigation = useNavigation();
    const snap = useSnapshot(state);
    const {width, height} = useWindowDimensions();

    const handleUsernameClick = async () => {
        if (props.uid == snap.uid) navigation.navigate('MyProfileScreen'); 
        else {
            setModalVisible(true);
            try {
                const uid = props.uid
                const userData = await getUser(uid);
                navigation.navigate('Profile', { userData: userData }); 
            } catch (error) {
                setErrorVisible(true);
            }
            setModalVisible(false);
        }
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);

    return (
        <View style={[styles.postContainer, {width: width}]}> 
            <View style={{backgroundColor: 'white'}}>
                <Image style={styles.sketch} source={{ uri: props.image}} />   
            </View>
            <TouchableOpacity onPress={handleUsernameClick} style={styles.authorContainer}>
                <View style={{flexDirection: 'row', padding: 15}}>
                    <Image style={styles.profilePicture} source={{ uri: props.profilePicture}}/>
                    <Text style={styles.uploader}>{props.username}</Text> 
                    <Text style={styles.uploadTime}>{props.uploadTime}</Text>     
                </View>
            </TouchableOpacity>    
            <LoadingModal visible={modalVisible} />
            <ErrorModal visible={errorVisible} onClose={() => {setErrorVisible(false)}} message={"Could not load user's page. Please try again later."}/>                 
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
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePicture: {
        width: 40, 
        height: 40, 
        borderRadius: 50, 
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 5,
        borderColor: 'white',
        backgroundColor: 'white'
    },
    authorContainer: {
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
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