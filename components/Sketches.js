import React from "react";
import {View} from 'react-native';
import Sketch from './Sketch'

function Sketches({sketches}) {

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
        <>            
            {sketches.map(displaySketch)}
        </>
    )
}

export default Sketches;

