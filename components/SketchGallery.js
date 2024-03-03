import React from "react";
import {StyleSheet, FlatList, TouchableHighlight, Image, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const actualImageHeight = 400;
const actualImageWidth = 400;

function SketchGallery(props) {
    const navigation = useNavigation();
    const numCols = 3;
    return (
        <>
            <FlatList
                style={styles.sketchGrid}
                data={props.sketches}
                numColumns={numCols}
                renderItem={({item}) => (
                    <TouchableHighlight 
                        style={styles.sketchContainer} 
                        onPress={() => {
                            navigation.navigate('FocusedSketchScreen', {
                                profilePicture: item.profilePicture,
                                uploader: item.uploader,
                                uploadAgoTime: item.uploadAgoTime,
                                sketch: item.sketch,
                            })
                        }}
                    >
                        <Image style={styles.sketch} source={{uri: 'https://www.dryeco.com/wp-content/uploads/2015/10/400x4005.png'}} />
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
