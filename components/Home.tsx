import React, {useRef} from "react";
import {StyleSheet, ScrollView, View, Text, SafeAreaView } from 'react-native';
import Sketches from './Sketches'
import { state } from '../state';
import { useSnapshot } from 'valtio';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Video, ResizeMode } from 'expo-av';
import { SketchCanvas, SketchCanvasRef } from 'rn-perfect-sketch-canvas';

function Home(props) {
    const navigation = useNavigation();
    const snap = useSnapshot(state);
    const img = require('../nofriends.gif');
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const canvasRef = useRef<SketchCanvasRef>(null);

    return(
        <>
            {snap.uploadedToday ?
                <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>  
                    <Sketches sketches={props.sketches} />
                </View>
            :
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <View style={styles.container}>
                        <View style={styles.content}>
                            <Video
                                    ref={video}
                                    style={styles.image}
                                    source={require('../nofriends.mp4')}
                                    useNativeControls={false}
                                    resizeMode={ResizeMode.CONTAIN}
                                    isLooping={true}
                                    isMuted={true}
                                    shouldPlay={true} // toggle between true and false on page switches maybe
                                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                            />
                            
                            <Text style={{color: 'white', marginBottom: 20}}>You have not created a sketch within 24 hours :(</Text>
                            <Button title="Create Sketch" onPress={() => navigation.navigate('Canvas', { canvasRef })} />
                        </View>
                    </View>
                </ScrollView>
            }
        </>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1, 
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'black', // Set your background color
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    image: {
        width: 350,
        height: 300,
    }
});

export default Home;

