import React from "react";
import {StyleSheet, FlatList, TouchableHighlight, Image, Dimensions, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const actualImageHeight = 400;
const actualImageWidth = 400;

function SketchGallery(props) {
    const navigation = useNavigation();
    return (
        <>
            <FlatList
                style={styles.sketchGrid}
                data={props.sketches}
                numColumns={3}
                renderItem={({item}) => (
                    <TouchableHighlight 
                        style={styles.sketchContainer} 
                        onPress={() => {
                            navigation.navigate('FocusedSketchScreen', {
                                image: item.image,
                                profilePicture: item.profilePicture,
                                uid: item.uid,
                                uploadTime: item.uploadTime,
                                username: item.username,
                            })
                        }}
                    >   
                        <View style={{backgroundColor: 'white'}}>
                            <Image style={styles.sketch} source={{ uri: item.image }} />
                        </View>
                    </TouchableHighlight>
                )}
            />
        </>
    );
}

const styles = StyleSheet.create({
    sketchContainer: {
        flex: 1,
        flexWrap:'wrap',
        flexDirection: 'row',
      },
    sketchGrid: {
        marginLeft: 0,
        marginRight: 0,
    },
    sketch: {
        height: actualImageHeight * (width / (3*actualImageWidth)),
        width: width / 3,
        borderColor: 'black',
        borderWidth: 1,
    },
});

export default SketchGallery;
