import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { state } from '../state';
import {getUser} from '../api/getUser';
import { useSnapshot } from 'valtio';
import LoadingModal from './LoadingModal';
import ErrorModal from './ErrorModal';
import { getAuth } from "firebase/auth";
import {app} from '../firebaseconfig'

function Sketch(props) {
    
    const navigation = useNavigation();
    const snap = useSnapshot(state);
    const {width, height} = useWindowDimensions();

    const handleUsernameClick = async () => {
        const auth = getAuth(app);
        if (props.uid == auth.currentUser.uid) navigation.navigate('MyProfileScreen');
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
        <View style={[styles.postContainer, {width: Math.min(width, height)}]}> 
            <View style={{backgroundColor: 'white'}}>
                <Image style={[styles.sketch, {width: Platform.isPad ? Math.min(width, height) * 0.7 : Math.min(width, height) * 0.9}]} source={{ uri: props.image}} />   
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
      aspectRatio: 1,
      borderColor: 'white',
      borderWidth: 1,
    },
    postContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePicture: {
        width: Platform.isPad ? 60 : 40, 
        height: Platform.isPad ? 60 : 40, 
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
        paddingTop: Platform.isPad ? 18 : 8, 
        fontSize: Platform.isPad ? 24 : 18, 
        justifyContent: 'flex-start',
        color: 'white'
    },
    uploadTime: {
        marginLeft: 3, 
        fontSize: Platform.isPad ? 19 : 14, 
        paddingTop: Platform.isPad ? 22.5 : 12, 
        justifyContent: 'flex-end', 
        color: '#b5b5b5'
    }
});

export default Sketch;