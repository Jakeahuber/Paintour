import React, { useState } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { useSnapshot } from 'valtio';
import constants from '../constants';
import { state } from '../state';
import Stroke from './Stroke';
import ColorPicker, { Panel1, Panel3, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Slider} from '@miblanchard/react-native-slider';

const Toolbar = ({shiftVertical }) => {
  const [showStrokes, setShowStrokes] = useState(false);
  const [brushIconStyle, setBrushIconStyle] = useState("brush-outline")
  const [paletteIconStyle, setPaletteIconStyle] = useState("color-palette-outline")
  const [paletteVisibility, setPaletteVisibility] = useState("none");
  const [brushVisibility, setBrushVisibility] = useState("none");

  const [value, setValue] = useState(0.2);

  const snap = useSnapshot(state);
  console.log("rerender");

  const handleStrokeChange = (stroke: number) => {
    state.strokeWidth = stroke;
    setShowStrokes(false);
  };

  const handleColorChange = (color) => { 
    state.strokeColor = color['hex'];
  }; 

  const handleSliderChange = (value) => {
    console.log(value);
    state.strokeWidth = (value[0] + 0.01) * 50;
    setValue(value[0]);
  }

  const handleBrushPress = () => { 
    if (brushIconStyle == 'brush') {
      setBrushIconStyle("brush-outline");
      setBrushVisibility('none');
      shiftVertical(0);
    }
    else {
      setBrushIconStyle("brush");
      setBrushVisibility("flex");
      setPaletteIconStyle("color-palette-outline");
      setPaletteVisibility("none");
      shiftVertical(0);
    }
  }; 

  const handlePalettePress = () => { 
    if (paletteIconStyle == 'color-palette') {
      setPaletteIconStyle("color-palette-outline")
      setPaletteVisibility("none");
      shiftVertical(0);
    }
    else {
      setBrushIconStyle("brush-outline")
      setPaletteIconStyle("color-palette")
      setPaletteVisibility("flex");
      shiftVertical(-60);
      setBrushVisibility("none")
    }
  }; 


  return (
    <>
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 10}}>
          <Ionicons name={brushIconStyle} size={35} color="white" style={{marginRight: 50}} onPress={handleBrushPress}/>
          <Ionicons name={paletteIconStyle} size={35} color="white" onPress={handlePalettePress} />
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', padding: 10, width: '100%' }}>
          
          <ColorPicker style={{ width: '70%', display: paletteVisibility, flexDirection: 'row'}} value={state.strokeColor} onComplete={handleColorChange}>
            <Panel1 style={{ flex: 1, marginRight: 20}}/>
            <HueSlider vertical />
          </ColorPicker>

          <View style={[styles.sliderContainer, {display: brushVisibility}]}>
            <Slider
              value={value}
              onSlidingComplete={handleSliderChange}
            />
          </View>
        </View>
    </>
  );
};

/*
        <ColorPicker style={{ width: '55%'}} value='red' onComplete={onSelectColor}>
          <Panel1 style={{marginBottom: 10}}/>
          <HueSlider />
        </ColorPicker>
*/

export default Toolbar;

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: 'black',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 10,
    paddingRight: 40,
    marginRight: 0,
  },
  sliderContainer: {
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    width: '90%',
  }
});