import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import { getFriends } from "../api/getFriends";
import LoadingModal from "./LoadingModal";
import ErrorModal from "./ErrorModal";

function ProfileStats(props) {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);

    const fontSize = Platform.isPad ? 28 : 24;
    const helperFontSize = Platform.isPad ? 16: 14

    const handleFriendsPress = async () => {
        setModalVisible(true);
        try {
            const friends = await getFriends();
            navigation.navigate("MyFriends", {friends: friends});
            setModalVisible(false);
        } catch {
            setModalVisible(false);
            setTimeout(() => {
                setErrorVisible(true)
            }, 500);
        }
      }

    if (props.clickableFriends) {
        return (
            <View style={{width: '100%'}}>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1, alignItems: 'center'}}>
                        <TouchableOpacity style={{alignItems: 'center'}} onPress={handleFriendsPress}>
                        <Text style={{justifyContent: 'flex-end',fontSize: fontSize, color: 'white'}}>{props.numFriends}</Text>
                        <Text style={{justifyContent: 'flex-start',fontSize: helperFontSize, color: 'white'}}>Friends</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1, alignItems: 'center'}}>
                        <Text style={{justifyContent: 'flex-end',fontSize: fontSize, color: 'white'}}>{props.numSketches}</Text>
                        <Text style={{justifyContent: 'flex-start',fontSize: helperFontSize, color: 'white'}}>Sketches</Text>
                    </View>
                </View>
                <LoadingModal visible={modalVisible}/>
                <ErrorModal visible={errorVisible} message={"Could not load friends. Please try again later."} onClose={() => {setErrorVisible(false)}}/>
            </View>
        );       
    }

    return (
        <View style={{width: '100%'}}>
            <View style={{flexDirection:"row"}}>
                <View style={{flex:1, alignItems: 'center'}}>
                    <Text style={{justifyContent: 'flex-end',fontSize: fontSize, color: 'white'}}>{props.numFriends}</Text>
                    <Text style={{justifyContent: 'flex-start',fontSize: helperFontSize, color: 'white'}}>Friends</Text>
                </View>
                <View style={{flex:1, alignItems: 'center'}}>
                    <Text style={{justifyContent: 'flex-end',fontSize: fontSize, color: 'white'}}>{props.numSketches}</Text>
                    <Text style={{justifyContent: 'flex-start',fontSize: helperFontSize, color: 'white'}}>Sketches</Text>
                </View>
            </View>
        </View>
    );
}

export default ProfileStats;