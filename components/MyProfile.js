import React, { useState } from 'react';
import {RefreshControl, View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableHighlight, FlatList } from 'react-native';
import ProfileStats from './ProfileStats';
import { useNavigation } from '@react-navigation/native';
import SketchGallery from './SketchGallery'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSnapshot } from 'valtio';
import { state } from '../state';
import CalendarImages from './CalendarImages';
import { getUser } from '../api/getUser';
import { updateMyData } from '../api/updateMyData';
import ErrorModal from './ErrorModal';

function MyProfile(props) {
    const snap = useSnapshot(state);

    const navigation = useNavigation();
    const [eyeIconStyle, setEyeIconStyle] = useState("grid-outline");
    const [lockIconStyle, setLockIconStyle] = useState("lock-closed-outline");

    const [message, setMessage] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);
    const closeModal = () => {
        setErrorVisible(false);
    };


    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        try {
            const userData = await getUser(state.uid);
            updateMyData(userData);
            state.forceCalendarImagesRerender = !state.forceCalendarImagesRerender;
        }
        catch (error) {
            setMessage("There was a problem refreshing user data.");
            setErrorVisible(true);
        }
        setRefreshing(false);
      }, []);

    const getProfileInfo = () => {
        return (
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.userInfoContainer}>
                        <Image
                            style={styles.profilePicture}
                            source={{ uri: snap.profilePicture}}
                            key={Date.now()}
                        />
                    </View>
                    <View style={{marginTop: 15, width: '100%', flexDirection: 'row'}}>
                        <ProfileStats
                            numFriends={snap.numFriends}
                            numSketches={snap.numSketches}
                            clickableFriends={true}
                        />
                    </View>
                </View>
            </ScrollView>    
        );
    };
    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center'}}>  
            <FlatList
                ListHeaderComponent={getProfileInfo}
                ListFooterComponent={<CalendarImages uid={state.uid}/>}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />    
            <ErrorModal visible={errorVisible} message={message} onClose={closeModal} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1, 
    },
    contentContainer: {
        alignItems: 'center',
        width: '100%',
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

export default MyProfile;

