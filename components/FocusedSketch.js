import React from "react";
import {View, SafeAreaView} from 'react-native';
import Sketch from './Sketch'

function FocusedSketch({route}) {
    const { profilePicture, username, uploadTime, image, uid } = route.params;
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>   
            <View style={{width: '100%', height: '100%'}}>
                <Sketch
                    profilePicture={profilePicture}
                    username={username}
                    uploadTime={uploadTime}
                    image={image}
                    uid={uid}
                />
            </View>      
        </SafeAreaView>
    );
}

export default FocusedSketch;