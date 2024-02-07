import React from "react";
import {View, Text} from 'react-native';

function ProfileStats(props) {
    return (
        <View style={{width: '100%'}}>
            <View style={{flexDirection:"row"}}>
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