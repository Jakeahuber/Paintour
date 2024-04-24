import { useNavigation } from "@react-navigation/native";
import React from "react";
import {View, Text, TouchableOpacity} from 'react-native';

function ProfileStats(props) {

    const navigation = useNavigation();

    const handleFriendsPress = () => {
        navigation.navigate("FriendsList");
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
                    <View style={{flex:1, alignItems: 'center'}}>
                        <Text style={{justifyContent: 'flex-end',fontSize: 24, color: 'white'}}>{props.streak}</Text>
                        <Text style={{justifyContent: 'flex-start',fontSize: 14, color: 'white'}}>Day Streak</Text>
                    </View>
                </View>
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
                <View style={{flex:1, alignItems: 'center'}}>
                    <Text style={{justifyContent: 'flex-end',fontSize: 24, color: 'white'}}>{props.streak}</Text>
                    <Text style={{justifyContent: 'flex-start',fontSize: 14, color: 'white'}}>Day Streak</Text>
                </View>
            </View>
        </View>
    );
}

export default ProfileStats;