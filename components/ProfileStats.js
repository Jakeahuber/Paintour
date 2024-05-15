import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import {View, Text, TouchableOpacity} from 'react-native';
import { getFriends } from "../api/getFriends";
import LoadingModal from "./LoadingModal";

function ProfileStats(props) {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const handleFriendsPress = async () => {
        setModalVisible(true);
        try {
            const friends = await getFriends();
            navigation.navigate("MyFriends", {friends: friends});
        } catch {
            console.error("Could not get to the friends page.");
        }
        setModalVisible(false);
      }

    if (props.clickableFriends) {
        return (
            <View style={{width: '100%'}}>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1, alignItems: 'center'}}>
                        <TouchableOpacity style={{alignItems: 'center'}} onPress={handleFriendsPress}>
                        <Text style={{justifyContent: 'flex-end',fontSize: 24, color: 'white'}}>{props.numFriends}</Text>
                        <Text style={{justifyContent: 'flex-start',fontSize: 14, color: 'white'}}>Friends</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1, alignItems: 'center'}}>
                        <Text style={{justifyContent: 'flex-end',fontSize: 24, color: 'white'}}>{props.numSketches}</Text>
                        <Text style={{justifyContent: 'flex-start',fontSize: 14, color: 'white'}}>Sketches</Text>
                    </View>
                </View>
                <LoadingModal visible={modalVisible}/>
            </View>
        );       
    }

    return (
        <View style={{width: '100%'}}>
            <View style={{flexDirection:"row"}}>
                <View style={{flex:1, alignItems: 'center'}}>
                    <Text style={{justifyContent: 'flex-end',fontSize: 24, color: 'white'}}>{props.numFriends}</Text>
                    <Text style={{justifyContent: 'flex-start',fontSize: 14, color: 'white'}}>Friends</Text>
                </View>
                <View style={{flex:1, alignItems: 'center'}}>
                    <Text style={{justifyContent: 'flex-end',fontSize: 24, color: 'white'}}>{props.numSketches}</Text>
                    <Text style={{justifyContent: 'flex-start',fontSize: 14, color: 'white'}}>Sketches</Text>
                </View>
            </View>
        </View>
    );
}

export default ProfileStats;