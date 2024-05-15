import React, { useState } from "react";
import {View, Text, Image} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import LoadingModal from "./LoadingModal";
import { state } from "../state";

const Friend = ({ username, numSketches, numFriends, profilePicture, friendStatus }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const handleFriendPress = async (uid) => {
        try {
          setLoading(true); 
          if (username == state.username) {
            navigation.navigate('MyProfile');
          }
          else {
            navigation.navigate('Profile', {userData: {username: username, numSketches: numSketches, numFriends: numFriends, profilePicture: profilePicture}});
          }
          setLoading(false); 
        } catch (error) {
          console.error('Error fetching user data:', error);
          setLoading(false);
        }
    }
    
    const handleRequestPress = async () => {
        if (friendStatus != "Request") {
          return;
        }
        console.log("handling request")
        try {
          setLoading(true); 
          setLoading(false); 
        } catch (error) {
          console.error('Error sending friend request:', error);
        }
    }

    const buttonColor = friendStatus === 'Friends' ? '#33b249' : '#4681f4';

    return(
        <View style={{ flexDirection: "row", width: '100%', paddingTop: 5, paddingBottom: 5}}>
            <View style={{ flex: 7 }}>
                <TouchableOpacity onPress={() => handleFriendPress("fake")}
                style={{ flexDirection: "row", alignItems: 'center', width: '100%'}}>
                <Image
                    source={{ uri: profilePicture }}
                    style={{ height: 45, width: 45, borderRadius: 100, marginRight: 10 }}
                />
                <Text style={{ color: 'white', fontSize: 18 }}>
                    {username}
                </Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              {friendStatus === 'Request' ? (
                  <TouchableOpacity 
                      style={{ backgroundColor: buttonColor, padding: 10, borderRadius: 50 }} 
                      onPress={handleRequestPress}
                  >
                      <Text style={{ color: 'white', fontSize: 16 }}>
                          {friendStatus}
                      </Text>
                  </TouchableOpacity>
              ) : (
                  <View 
                      style={{ backgroundColor: buttonColor, padding: 10, borderRadius: 50 }}
                  >
                      <Text style={{ color: 'white', fontSize: 16 }}>
                          {friendStatus}
                      </Text>
                  </View>
              )}
            </View>
            <LoadingModal visible={loading} />      
        </View>          
    )
}

export default Friend;
