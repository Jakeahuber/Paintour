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

