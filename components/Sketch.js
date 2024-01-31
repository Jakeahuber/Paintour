import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';

const win = Dimensions.get('window');
const sketchSize = 400;
const ratio = win.width/sketchSize; 

function Sketch(props) {
    return (
        <View style={styles.postContainer}>           
            <View style={styles.authorContainer}>
                <Image
                    style={styles.profilePicture}
                    source={{ uri: props.profilePicture}}
                />
                <Text style={styles.uploader}>{props.uploader}</Text>        
                <Text style={styles.uploadTime}>{props.uploadAgoTime}</Text>                         
            </View>
            <Image
                style={styles.sketch}
                source={{ uri: props.sketch}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    sketch: {
      width: '90%',
      height: sketchSize * ratio,
      borderWidth: 1,
      borderColor: 'white',
    },
    postContainer: {
        marginBottom: 20,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    profilePicture: {
        width: 40, 
        height: 40, 
        borderRadius: 50, 
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: 'white',
    },
    authorContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingLeft: '5%',
        marginBottom: 5,
    },
    uploader: {
        marginLeft: 3, 
        paddingTop: 8, 
        fontSize: 18, 
        color: 'white', 
        justifyContent: 'flex-start'
    },
    uploadTime: {
        marginLeft: 3, 
        fontSize: 14, 
        paddingTop: 12, 
        justifyContent: 'flex-end', 
        color: '#b5b5b5'
    }
});

export default Sketch;