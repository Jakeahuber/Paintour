import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSnapshot } from 'valtio';
import constants from '../constants';
import { state } from '../state';
import Stroke from './Stroke';
import ColorPicker from 'react-native-wheel-color-picker'


const Toolbar = () => {
  const [showStrokes, setShowStrokes] = useState(false);
  const snap = useSnapshot(state);

  const handleStrokeChange = (stroke: number) => {
    state.strokeWidth = stroke;
    setShowStrokes(false);
  };

  const handleColorChange = (color) => { 
    state.strokeColor = color;
}; 

  return (
    <>
      <View style={styles.toolbar}>
          <ColorPicker
            color={snap.strokeColor}
            onColorChange={handleColorChange} 
            thumbSize={30}
            gapSize={20}
            sliderSize={30}
            noSnap={true}
            useNativeDriver={false}
            useNativeLayout={false}
            swatches={true}
            row={true}
            shadeSliderThumb={true}
            
            palette={['white', '#ed1c24','#d11cd5','#1633e6','#00c85d', '#ffde17', '#f26522']}
          />
      </View>
    </>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: 'black',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 10,
    paddingRight: 40,
    marginRight: 0,
  }
});