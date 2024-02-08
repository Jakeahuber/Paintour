import React from "react";
import {StyleSheet, FlatList, TouchableHighlight, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
        justifyContent: 'center',
        flexDirection: 'row',
      },
    sketchGrid: {
        marginLeft: 0,
        marginRight: 0,
    },
    sketch: {
        justifyContent: 'center',
        height: 120,
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
    },
});

export default SketchGallery;
