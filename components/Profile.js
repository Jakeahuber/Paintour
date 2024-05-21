import React, {useState, useEffect} from "react";
import {View, Text, Image, StyleSheet, ScrollView, SafeAreaView, FlatList } from 'react-native';
import ProfileStats from './ProfileStats';
import {getUser} from '../api/getUser';

function Profile({ route }) {

    const { userData } = route.params || {};
    console.log(userData);
    console.log("USERDATA ABOVE");
      
    const getProfileInfo = () => {
        return (
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.userInfoContainer}>
                        <Image
                            style={styles.profilePicture}
                            source={{ uri: userData.profilePicture}}
                        />
                        <Text style={{marginLeft: 3, marginTop: 10, fontSize: 22, color: 'white'}}>{userData.username}</Text>  
                    </View>
                    <View style={{marginTop: 15, width: '100%'}}>
                        <ProfileStats numFriends={userData.numFriends} numSketches={userData.numSketches}
                                      clickableFriends={false}/>
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
        backgroundColor: 'white'
    },
    userInfoContainer: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
    },
});

export default Profile;

