import React from "react";
import {View, SafeAreaView, Text} from 'react-native';
import Sketch from './Sketch'

function FocusedSketch({route}) {
    const { profilePicture, username, uploadTime, image, prompt, uid } = route.params;
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>   
            <View style={{width: '100%', height: '100%'}}>
                <View style={{ width: '100%', height: 60, alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 24, textAlign: 'center'}}>Prompt:</Text>
                    <Text style={{color: 'white', fontSize: 24, textAlign: 'center'}}>{prompt}</Text>
                </View>
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