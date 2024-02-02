import React, {useState} from "react";
import {FlatList, Image, StyleSheet, Text, TouchableHighlight, View, Modal} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sketch from './Sketch'
import { useNavigation } from '@react-navigation/native';

function SketchGallery({sketches}) {
    const navigation = useNavigation();
    const numCols = 3;
    const [focusedProfilePicture, setFocusedProfilePicture] = useState('example')
    const [focusedUploader, setFocusedUploader] = useState('example')
    const [focusedUploadAgoTime, setFocusedUploadAgoTime] = useState('example')
    const [focusedSketch, setFocusedSketch] = useState('example')
    const [focusedSketchDisplay, setFocusedSketchDisplay] = useState('none')

    return (
        <>
            <FlatList
                style={styles.sketchGrid}
                data={sketches}
                numColumns={numCols}
                renderItem={({item}) => (
                    <TouchableHighlight 
                        style={styles.sketchContainer} 
                        onPress={() => {
                            console.log(item)
                            navigation.setOptions({headerTitle: () => (
                                <TouchableHighlight
                                    onPress={() => {
                                        setFocusedSketchDisplay('none')
                                        navigation.setOptions({ headerTitle: "My Profile"})
                                    }}
                                >
                                    <Ionicons name="arrow-back" size={24} color="white" />
                                </TouchableHighlight>
                            )})
                            setFocusedProfilePicture(item.profilePicture)
                            setFocusedUploader(item.uploader)
                            setFocusedUploadAgoTime(item.uploadAgoTime)
                            setFocusedSketch(item.sketch)
                            setFocusedSketchDisplay('flex')
                        }}
                    >
                        <Image style={styles.sketch} source={{uri: 'https://www.dryeco.com/wp-content/uploads/2015/10/400x4005.png'}} />
                    </TouchableHighlight>
                )}
            />
            
            <View style={{backgroundColor: 'green', width: '100%', position: 'fixed', top: 0, left: 0, display: focusedSketchDisplay, justifyContent: 'center'}}>
                <Sketch
                    profilePicture={focusedProfilePicture}
                    uploader={focusedUploader}
                    uploadAgoTime={focusedUploadAgoTime}
                    sketch={focusedSketch}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1, 
    },
    contentContainer: {
        alignItems: 'center',
        backgroundColor: 'black',
        marginBottom: 20
    },
    profilePicture: {
        width: 125, 
        height: 125, 
        borderRadius: 125 / 2, 
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: 'white',
    },
    userInfoContainer: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        zIndex: 1,
    },
    sketchContainer: {
        flex: 1,
        flexWrap:'wrap',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      sketch: {
        justifyContent: 'center',
        height: 120,
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
      },
    sketchGrid: {
        marginLeft: 0,
        marginRight: 0,
        width: '100%',
        backgroundColor: 'green'
    }
});

export default SketchGallery;