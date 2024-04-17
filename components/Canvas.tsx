import * as React from 'react';
import { useRef, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  useWindowDimensions,
  Button,
  Text, 
  TouchableOpacity,
  ScrollView,
  Animated
} from 'react-native';
import { SketchCanvas, SketchCanvasRef } from 'rn-perfect-sketch-canvas';
import { useSnapshot } from 'valtio';
import Header from './Header';
import Toolbar from './Toolbar';
import { state } from '../state';

const GetSketchCanvas = ({canvasRef}) => {
  const snap = useSnapshot(state);
  const { height, width } = useWindowDimensions();
  
  return (
    <View style={{
      width: Math.min(height, width) - 50,
      height: Math.min(height, width) - 50,
      transform: snap.zoomableCanvas ? [] : [{ scale: snap.scale }],
    }}>
      <SketchCanvas
        strokeColor={snap.strokeColor}
        strokeWidth={snap.strokeWidth + (snap.forceReloadToggle ? 1e-10 : -1e-10)}
        ref={canvasRef}
        containerStyle={{
          width: Math.min(height, width) - 50,
          height: Math.min(height, width) - 50,
          backgroundColor: 'white',
          left: (snap.zoomableCanvas ? 0 : snap.offsetX),
          top:  (snap.zoomableCanvas ? 0 : snap.offsetY),
        }}
      />
    </View>
  );

};

export default function Canvas({ route }) {

  const { canvasRef } = route.params;
  const [prevWidth, setPrevWidth ] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;

  const snap = useSnapshot(state);

  const handleScrollStart = () => {
    canvasRef.current?.resetCurrentPoints();
  };

  const [isShifted, setIsShifted] = useState(false);

  const shiftVertical = (value) => {
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
    
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, alignItems: 'center'}}>    
        <Animated.View style={{width: '100%', alignItems: 'center', transform: [{ translateY }] }}>
        <View style={{ width: '90%', height: 85, alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize: 24, textAlign: 'center'}}>Today's Prompt:</Text>
          <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>A penguin trying to master the art of skateboarding on an icy slope.</Text>
        </View>
        <Header canvasRef={canvasRef}/>
        <View style={{width: '100%', zIndex: -1, marginTop: 10}}>
          <ScrollView 
            bounces={false}
            bouncesZoom={false}
            maximumZoomScale={4}
            minimumZoomScale={1}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false} 
            onScrollBeginDrag={handleScrollStart}
            scrollEventThrottle={10}
            >  
              <View style={{alignItems: 'center', height: '100%', justifyContent: 'center'}}>
                <GetSketchCanvas canvasRef={canvasRef}/>
              </View>   
            </ScrollView>
        </View>
        <Toolbar shiftVertical={shiftVertical}/>
        </Animated.View>

      </View>
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  }
});