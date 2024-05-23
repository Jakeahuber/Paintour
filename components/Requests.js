import React from "react";
import {View, FlatList, Text, StyleSheet, Image, Platform} from 'react-native';
import RequestedFriend from "./RequestedFriend";
import { useSnapshot } from "valtio";
import { state } from "../state";

const Requests = () => {
    const snap = useSnapshot(state);

    if (snap.requests.length == 0) {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image source={require('../assets/nofriendsyet.gif')} style={styles.image}/>
                    <Text style={{color: 'white', marginBottom: 40, fontSize: 24}}>
                        You Have No Requests
                    </Text>
                </View>
            </View>
        )
    }

    return(
        <View style={{alignItems: 'center', margin: 10}}>
            <FlatList
                data={snap.requests}
                renderItem={({ item }) => (
                    <RequestedFriend
                        username={item.username}
                        numSketches={item.numSketches}
                        numFriends={item.numFriends}
                        profilePicture={item.profilePicture}
                        uid={item.uid}
                    />
                )}
                style={{width: '100%', height: '100%'}}
            />            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        marginTop: Platform.isPad ? -100 : -20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    image: {
        width: Platform.isPad ? 425 : 300,
        height: Platform.isPad ? 425 : 300,
    }
});


export default Requests;