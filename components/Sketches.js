import React, {useRef} from "react";
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import Sketch from './Sketch'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'

function Sketches({sketches}) {

    const flatListRef = useRef(null);
    const { height, width } = useWindowDimensions();
    
    function displaySketch(sketch) {
        return (
            <Sketch
                profilePicture={sketch.profilePicture}
                uploader={sketch.uploader}
                uploadAgoTime={sketch.uploadAgoTime}
                sketch={sketch.sketch}
                liked={sketch.liked}
                numLikes={sketch.numLikes}
            />
        )
    }

    return (
        <View> 
            <FlatList
                ref={flatListRef}
                data={sketches}
                renderItem={({item}) => {
                    return (
                            <Sketch
                                profilePicture={item.profilePicture}
                                uploader={item.uploader}
                                uploadAgoTime={item.uploadAgoTime}
                                sketch={item.sketch}
                                liked={item.liked}
                                numLikes={item.numLikes}
                            />
                    )
                }}
                horizontal={true}
                keyExtractor={(item) => item.id}
                snapToAlignment="center"
                decelerationRate={"slow"}
                snapToInterval={width}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                disableIntervalMomentum={true}
            />
        </View>  
    )
}

const styles = StyleSheet.create({
    leftButton: {
      position: 'absolute',
      left: 10,
      top: '50%',
      zIndex: 10,
      // Style your left button
    },
    rightButton: {
      position: 'absolute',
      right: 10,
      top: '50%',
      zIndex: 10,
      // Style your right button
    },
  });
  

export default Sketches;

