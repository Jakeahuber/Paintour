import React, {useState} from "react";
import {View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableHighlight, FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import ProfileStats from './ProfileStats';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sketch from './Sketch'
import SketchGallery from './SketchGallery'

const win = Dimensions.get('window');
const sketchSize = 400;
const ratio = win.width/sketchSize; 

function MyProfile(props) {

    const [focusedProfilePicture, setFocusedProfilePicture] = useState('example')
    const [focusedUploader, setFocusedUploader] = useState('example')
    const [focusedUploadAgoTime, setFocusedUploadAgoTime] = useState('example')
    const [focusedSketch, setFocusedSketch] = useState('example')
    const [focusedSketchDisplay, setFocusedSketchDisplay] = useState('none')
    const navigation = useNavigation();

    const getProfileInfo = () => {
        return (
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.userInfoContainer}>
                        <Image
                            style={styles.profilePicture}
                            source={{ uri: props.profilePicture}}
                        />
                        <Text style={{marginLeft: 3, marginTop: 10, fontSize: 22, color: 'white'}}>{props.username}</Text>  
                        <TouchableHighlight onPress={() => {
                                navigation.navigate('EditProfileScreen')
                            }}>
                            <Text style={{marginLeft: 3, marginTop: 10, fontSize: 14, color: 'white'}}>Edit Profile</Text>  
                        </TouchableHighlight>
                    </View>
                    <View style={{marginTop: 15, width: '100%'}}>
                        <ProfileStats
                            numFriends={props.numFriends}
                            numSketches={props.numSketches}
                            streak={props.streak}
                        />
                    </View>
                </View>
            </ScrollView>    
        );
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>   
            <FlatList
                ListHeaderComponent={getProfileInfo}
                ListFooterComponent={<SketchGallery sketches={props.sketches}/>}
            />    
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1, 
    },
    contentContainer: {
        alignItems: 'center',
        backgroundColor: 'black',
        marginBottom: 20
    },
    profilePicture: {
        width: 125, 
        height: 125, 
        borderRadius: 125 / 2, 
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: 'white',
    },
    userInfoContainer: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        zIndex: 1,
    },
    sketchContainer: {
        flex: 1,
        flexWrap:'wrap',
        justifyContent: 'center',
        flexDirection: 'row',
      },
    sketchGrid: {
        marginLeft: 0,
        marginRight: 0,
    },
    scrollViewContainer: {
        flexGrow: 1, 
    },
    contentContainer: {
        alignItems: 'center',
        backgroundColor: 'black',
        marginBottom: 20
    },
    profilePicture: {
        width: 125, 
        height: 125, 
        borderRadius: 125 / 2, 
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: 'white',
    },
    userInfoContainer: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        zIndex: 1,
    },
    sketchContainer: {
        flex: 1,
        flexWrap:'wrap',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      sketch: {
        justifyContent: 'center',
        height: 120,
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
      }
});

export default MyProfile;

