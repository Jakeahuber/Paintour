import React, { useState } from "react";
import {View, Text, Image} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import LoadingModal from "./LoadingModal";
import { state } from "../state";
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { handleFriendRequest } from "../api/handleFriendRequest";
import ErrorModal from "./ErrorModal";

const RequstedFriend = ({ uid, username, numSketches, numFriends, profilePicture }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const handleFriendPress = async () => {
        setLoading(true); 
        if (username == state.username) {
            navigation.navigate('MyProfile');
        }
        else {
            navigation.navigate('Profile', {userData: {username: username, numSketches: numSketches, numFriends: numFriends, profilePicture: profilePicture}});
        }
        setLoading(false); 
    }
    
    const handleAccept = async () => {
        setLoading(true); 
        try {
            await handleFriendRequest(uid, true);
        } catch (error) {
            setErrorVisible(true);
        }
        setLoading(false);
    }

    const handleDecline = async () => {
        setLoading(true); 
        try {
            await handleFriendRequest(uid, false);
        } catch (error) {
          setErrorVisible(true);
        }
        setLoading(false);
    }

    const [errorVisible, setErrorVisible] = useState(false);

    return(
        <View style={{ flexDirection: "row", width: '100%', paddingTop: 5, paddingBottom: 5}}>
            <View style={{ flex: 7 }}>
                <TouchableOpacity onPress={() => handleFriendPress("fake")}
                style={{ flexDirection: "row", alignItems: 'center', width: '100%'}}>
                <Image
                    source={{ uri: profilePicture }}
                    style={{ height: 45, width: 45, borderRadius: 100, marginRight: 10, backgroundColor: 'white' }}
                />
                <Text style={{ color: 'white', fontSize: 18 }}>
                    {username}
                </Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <TouchableOpacity 
                    style={{ backgroundColor: "#33b249", padding: 10, borderRadius: 50, marginRight: 10 }} 
                    onPress={handleAccept}
                >
                    <Ionicons name="checkmark" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{ backgroundColor: "#dd7973", padding: 10, borderRadius: 50 }} 
                    onPress={handleDecline}
                >
                    <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <LoadingModal visible={loading} /> 
            <ErrorModal visible={errorVisible} onClose={() => {setErrorVisible(false)}} message={"Could not handle friend request. Please try again later."}/>     
        </View>          
    )
}

export default RequstedFriend;
