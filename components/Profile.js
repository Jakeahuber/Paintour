import React from "react";
import {View, Text, Image, StyleSheet, ScrollView, SafeAreaView, FlatList } from 'react-native';
import ProfileStats from './ProfileStats';
import SketchGallery from './SketchGallery';

function Profile({ route }) {
    const { uid } = route.params || {};

    const [username, setUsername] = useState("");
    const [numSketches, setNumSketches] = useState(-1);
    const [streak, setStreak] = useState(-1);
    const [profilePicture, setProfilePicture] = useState("");
    const [numFriends, setNumFriends] = useState(-1);

    const getUser = (uid) => {
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/getUser";
        const url = `${endpoint}?uid=${uid}`;
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(response => response.json())
        .then(data => {
            setUsername(data.username);
            setNumSketches(data.numSketches);
            setStreak(data.streak);
            setProfilePicture(data.profilePicture);
            setNumFriends(data.numFriends);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const sketches = [];

    const getProfileInfo = () => {
        getUser(uid);
        return (
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.userInfoContainer}>
                        <Image
                            style={styles.profilePicture}
                            source={{ uri: profilePicture}}
                        />
                        <Text style={{marginLeft: 3, marginTop: 10, fontSize: 22, color: 'white'}}>{username}</Text>  
                    </View>
                    <View style={{marginTop: 15, width: '100%'}}>
                        <ProfileStats numFriends={numFriends} numSketches={numSketches} streak={streak}/>
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
                    ListFooterComponent={<SketchGallery sketches={sketches}/>}
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
    },
});

export default Profile;

