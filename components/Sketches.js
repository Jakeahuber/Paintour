
import React, {useRef} from "react";
import {View, useWindowDimensions, Text} from 'react-native';
import Sketch from './Sketch'
import { FlatList } from 'react-native-gesture-handler';
import { state } from '../state';
import { useSnapshot } from 'valtio';

function Sketches() {
    const snap = useSnapshot(state);
    const flatListRef = useRef(null);
    const width = useWindowDimensions().width;

    if (snap.numFriends == 0) {
        return (
            <View>
                <Text style={{color: 'white'}}>You don't have any friends :(</Text>
                <Text style={{color: 'white'}}>Search For Friends</Text>
            </View>
        )
    }

    if (snap.friendSketches.length == 0) {
        return (
            <Text style={{color: 'white'}}>No Friends Have Posted :(</Text>
        )
    }

    return (
        <View> 
            <FlatList
                ref={flatListRef}
                data={snap.friendSketches}
                renderItem={({item}) => {
                    return (
                        <Sketch
                            image={item.image}
                            profilePicture={item.profilePicture}
                            uid={item.uid}
                            uploadTime={item.uploadTime}
                            username={item.username}
                        />
                    )
                }}
                horizontal={false}
                keyExtractor={(item) => item.id}
                snapToAlignment="center"
                decelerationRate={"slow"}
                snapToInterval={width}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                disableIntervalMomentum={true}
            />
        </View>  
    )
}

export default Sketches;

