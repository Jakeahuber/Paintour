import React, { useState } from 'react';
import {View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableHighlight, FlatList } from 'react-native';
import ProfileStats from './ProfileStats';
import { useNavigation } from '@react-navigation/native';
import SketchGallery from './SketchGallery'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSnapshot } from 'valtio';
import { state } from '../state';

function MyProfile(props) {
    const snap = useSnapshot(state);

    const navigation = useNavigation();
    const [eyeIconStyle, setEyeIconStyle] = useState("grid-outline");
    const [lockIconStyle, setLockIconStyle] = useState("lock-closed-outline");

    const getProfileInfo = () => {
        return (
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.userInfoContainer}>
                        <Image
                            style={styles.profilePicture}
                            source={{ uri: snap.profilePicture}}
                        />
                    </View>
                    <View style={{marginTop: 15, width: '100%'}}>
                        <ProfileStats
                            numFriends={snap.numFriends}
                            numSketches={snap.numSketches}
                            streak={snap.streak}
                        />
                    </View>
                    <View style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10, marginTop: 10, alignItems: 'center'}}>
                        <View style={{width: '50%', alignItems: 'center'}}>
                            <Ionicons name={eyeIconStyle} size={30} color="white" />
                        </View>
                        <View style={{width: '50%', alignItems: 'center'}}>
                            <Ionicons name={lockIconStyle} size={30} color="white" />
                        </View>
                    </View>
                </View>
            </ScrollView>    
        );
    };

    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center'}}>  
            <View style={{aspectRatio: 9/16}}>
            <FlatList
                ListHeaderComponent={getProfileInfo}
                ListFooterComponent={<SketchGallery sketches={snap.userSketches}/>}
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
    },
});

export default MyProfile;

