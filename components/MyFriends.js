import React from "react";
import {View, FlatList} from 'react-native';
import Friend from "./Friend";

const MyFriends = ({ route }) => {

    const { friends } = route.params;

    return(
        <View style={{alignItems: 'center', margin: 10}}>
            <FlatList
                data={friends}
                renderItem={({ item }) => (
                    <Friend
                        username={item.username}
                        numSketches={item.numSketches}
                        numFriends={item.numFriends}
                        profilePicture={item.profilePicture}
                        friendStatus={"Friends"}
                    />
                )}
                style={{width: '100%', height: '100%'}}
            />            
        </View>
    )
}

export default MyFriends;