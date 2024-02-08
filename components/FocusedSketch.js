import React from "react";
import {View, SafeAreaView} from 'react-native';
import Sketch from './Sketch'

function FocusedSketch({route, navigation}) {
    const { profilePicture, uploader, uploadAgoTime, sketch } = route.params;
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>   
            <View style={{width: '100%', height: '100%'}}>
                <Sketch
                    profilePicture={profilePicture}
                    uploader={uploader}
                    uploadAgoTime={uploadAgoTime}
                    sketch={sketch}
                />
            </View>      
        </SafeAreaView>
    );
}

export default FocusedSketch;