import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const win = Dimensions.get('window');
const sketchSize = 400;
const ratio = win.width/sketchSize; 

function Sketch(props) {

    var liked = props.liked;
    const numLikes = props.numLikes + " likes"

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

            <View style={styles.authorContainer}>
                {liked? (
                    <Ionicons name={"heart"} size={30} color={"white"}/>
                ) : (
                    <Ionicons name={"heart-outline"} size={30} color={"white"} style={{}}/>
                )}
                <Text style={styles.likes}>{numLikes}</Text>        
            </View>
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
        marginBottom: 15,
        marginTop: 15,
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
        marginTop: 5,
    },
    uploader: {
        marginLeft: 3, 
        paddingTop: 8, 
        fontSize: 18, 
        color: 'white', 
        justifyContent: 'flex-start'
    },
    likes: {
        marginLeft: 3, 
        paddingTop: 4, 
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