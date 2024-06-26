import React, { useState } from "react";
import {View, Text, Image, Platform, StyleSheet} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import LoadingModal from "./LoadingModal";
import { state } from "../state";
import { sendFriendRequest } from "../api/sendFriendRequest";
import ErrorModal from "./ErrorModal";

const Friend = ({ uid, username, numSketches, numFriends, profilePicture, friendStatus }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [newFriendStatus, setNewFriendStatus] = useState(friendStatus);
    const [errorVisible, setErrorVisible] = useState(false);

    const handleFriendPress = async () => {
      setLoading(true); 
      if (username == state.username) {
        navigation.navigate('MyProfile');
      }
      else {
        navigation.navigate('Profile', {userData: {username: username, numSketches: numSketches, numFriends: numFriends, profilePicture: profilePicture, uid: uid}});
      }
      setLoading(false); 
    }
    
    const handleRequestPress = async () => {
        if (newFriendStatus != "Request") {
          return;
        }
        try {
          setLoading(true); 
          await sendFriendRequest(uid);
          setNewFriendStatus("Pending");
          setLoading(false); 
        } catch (error) {
          setLoading(false);
          setTimeout(() => {
            setErrorVisible(true);
          }, 500);
        }
    }

    const buttonColor = friendStatus === 'Friends' ? '#33b249' : '#4681f4';
    return(
        <View style={{ flexDirection: "row", width: '100%', paddingTop: Platform.isPad ? 8 : 5, paddingBottom: Platform.isPad ? 8 : 5}}>
            <View style={{ flex: 7 }}>
                <TouchableOpacity onPress={() => handleFriendPress()}
                style={{ flexDirection: "row", alignItems: 'center', width: '100%'}}>
                <Image
                    source={{ uri: profilePicture }}
                    style={styles.image}
                />
                <Text style={styles.text}>
                    {username}
                </Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              {newFriendStatus === 'Request' ? (
                  <TouchableOpacity 
                      style={{ backgroundColor: buttonColor, padding: 10, borderRadius: 50 }} 
                      onPress={handleRequestPress}
                  >
                      <Text style={styles.text}>
                          {newFriendStatus}
                      </Text>
                  </TouchableOpacity>
              ) : (
                  <View 
                      style={{ backgroundColor: buttonColor, padding: 10, borderRadius: 50 }}
                  >
                      <Text style={styles.text}>
                          {newFriendStatus}
                      </Text>
                  </View>
              )}
            </View>
            <LoadingModal visible={loading} />      
            <ErrorModal visible={errorVisible} message={"Could not send friend request. Please try again later."} onClose={() => {setErrorVisible(false)}}/>
        </View>          
    )
}
const styles = StyleSheet.create({
    image: {
        height: Platform.isPad ? 55 : 45,
        width: Platform.isPad ? 55 : 45,
        borderRadius: 100,
        marginRight: 10,
        backgroundColor: 'white' 
    },
    text: {
        color: 'white',
        fontSize: Platform.isPad? 20 : 16,
    }
});

export default Friend;
