import React from "react";
import {View, SafeAreaView, Text} from 'react-native';
import Sketch from './Sketch'

function FocusedSketch({route}) {
    const { profilePicture, username, uploadTime, image, prompt, uid } = route.params;
    return (
            <View>
                <View >
                    <View style={{marginBottom: 20}}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 22 }}>Prompt:</Text>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 28 }}>{prompt}</Text>
                    </View>
                    <Sketch
                        profilePicture={profilePicture}
                        username={username}
                        uploadTime={uploadTime}
                        image={image}
                        uid={uid}
                    />
                </View>
            </View>
    );
}

export default FocusedSketch;