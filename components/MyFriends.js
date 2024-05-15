import React, { useState } from "react";
import {View, FlatList, Text} from 'react-native';
import LoadingModal from "./LoadingModal";
import Friend from "./Friend";

const MyFriends = ({ route }) => {

  const { friends } = route.params;

    console.log(friends);
    const [loading, setLoading] = useState(false);

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
            <LoadingModal visible={loading} />      
        </View>
    )
}

export default MyFriends;