import React, {useRef} from "react";
import {
  View,
  Text, 
  Animated,
  Platform
} from 'react-native';
import { useSnapshot } from 'valtio';
import { state } from '../state';
import Toolbar from "./Toolbar";
import SketchCanvas from "./SketchCanvas";

export default function Canvas({ route }) {

  const { forDrawingProfilePic } = route.params || {};
  const snap = useSnapshot(state);
  const translateY = useRef(new Animated.Value(0)).current;

  const shiftVertical = (value) => {
    if (forDrawingProfilePic) return;
    if (Platform.isPad) return;
    Animated.timing(
      translateY,
      {
        toValue: value,
        duration: 500,
        useNativeDriver: true,
      }
    ).start();
  };

  return (
    <View style={{flex: 1, height: '100%', alignItems: 'center'}}>
    <View style={{flex: 1, alignItems: 'center', width: Platform.isPad ? 550 : 350}}>   
      <Animated.View style={{width: '100%', alignItems: 'center', transform: [{ translateY }] }}> 
        {forDrawingProfilePic ?
          <></>
          :
          <View style={{ width: '100%', height: 60, alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 24, textAlign: 'center'}}>Today's Prompt:</Text>
            <Text style={{color: 'white', fontSize: 24, textAlign: 'center'}}>{snap.prompt}</Text>
          </View>
        }
        <View style={{width: '100%', zIndex: -1, marginTop: 10}}>
          <SketchCanvas route={{params:{forDrawingProfilePic: forDrawingProfilePic}}}/>
        </View>
        <Toolbar shiftVertical={shiftVertical}/>
      </Animated.View>
    </View>
  </View>
  );
};