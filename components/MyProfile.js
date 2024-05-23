import React, { useState } from 'react';
import {RefreshControl, View, Image, StyleSheet, ScrollView, SafeAreaView, FlatList, Platform} from 'react-native';
import ProfileStats from './ProfileStats';
import { useSnapshot } from 'valtio';
import { state } from '../state';
import CalendarImages from './CalendarImages';
import { getUser } from '../api/getUser';
import { updateMyData } from '../api/updateMyData';
import ErrorModal from './ErrorModal';
import { getAuth } from "firebase/auth";
import {app} from "../firebaseconfig";

function MyProfile() {
    const snap = useSnapshot(state);
    const auth = getAuth(app);

    const [errorVisible, setErrorVisible] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        try {
            const userData = await getUser(auth.currentUser.uid);
            updateMyData(userData);
            state.forceCalendarImagesRerender = !state.forceCalendarImagesRerender;
        }
        catch (error) {
            setErrorVisible(true);
        }
        setRefreshing(false);
    }, []);

    const getProfileInfo = () => {
        return (
            <View style={styles.scrollViewContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.userInfoContainer}>
                        <Image
                            style={styles.profilePicture}
                            source={{ uri: snap.profilePicture}}
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
            </View>    
        );
    };
    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center'}}>  
            <FlatList
                ListHeaderComponent={getProfileInfo}
                ListFooterComponent={<CalendarImages/>}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />    
            <ErrorModal visible={errorVisible} message={"There was a problem refreshing user data."} onClose={() => {setErrorVisible(false)}} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1, 
        alignItems: 'center'
    },
    contentContainer: {
        alignItems: 'center',
        width: Platform.isPad ? '80%' : '100%',
    },
    profilePicture: {
        width: Platform.isPad ? 150: 125, 
        height: Platform.isPad ? 150: 125, 
        borderRadius: Platform.isPad ? 150/2 : 125/2,  
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

