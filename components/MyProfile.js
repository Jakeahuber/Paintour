import React, {useState} from "react";
import {View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableHighlight, FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import ProfileStats from './ProfileStats';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sketch from './Sketch'

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

    const getSketchGallery = () => {
        const numCols = 3;
        return (
            <>
                <FlatList
                    style={styles.sketchGrid}
                    data={props.sketches}
                    numColumns={numCols}
                    renderItem={({item}) => (
                        <TouchableHighlight 
                            style={styles.sketchContainer} 
                            onPress={() => {
                                console.log(item)
                                navigation.setOptions({headerTitle: () => (
                                    <TouchableHighlight
                                        onPress={() => {
                                            setFocusedSketchDisplay('none')
                                            navigation.setOptions({ headerTitle: "My Profile"})
                                        }}
                                    >
                                        <Ionicons name="arrow-back" size={24} color="white" />
                                    </TouchableHighlight>
                                )})
                                setFocusedProfilePicture(item.profilePicture)
                                setFocusedUploader(item.uploader)
                                setFocusedUploadAgoTime(item.uploadAgoTime)
                                setFocusedSketch(item.sketch)
                                setFocusedSketchDisplay('flex')
                            }}
                        >
                            <Image style={styles.sketch} source={{uri: 'https://www.dryeco.com/wp-content/uploads/2015/10/400x4005.png'}} />
                        </TouchableHighlight>
                    )}
                />
            </>
        );
    };


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
                                navigation.setOptions({headerTitle: () => (
                                    navigation.setOptions({ headerTitle: "Edit Profile"})
                                )})
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
                ListFooterComponent={getSketchGallery}
            />  
            <View style={{width: '100%', height: '100%', display: focusedSketchDisplay}}>
                <Sketch
                    profilePicture={focusedProfilePicture}
                    uploader={focusedUploader}
                    uploadAgoTime={focusedUploadAgoTime}
                    sketch={focusedSketch}
                />
            </View>      
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
      },
    sketchGrid: {
        marginLeft: 0,
        marginRight: 0,
        width: '100%',
        backgroundColor: 'green'
    }
});

export default MyProfile;

