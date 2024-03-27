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
  ScrollView
} from 'react-native';
 
import { SketchCanvas, SketchCanvasRef } from 'rn-perfect-sketch-canvas';

import { useSnapshot } from 'valtio';
import Header from './Header';
import Toolbar from './Toolbar';
import { state } from '../state';
import { ReactNativeZoomableView } from 'react-native-zoomable-view';
import { PanGestureHandler } from 'react-native-gesture-handler';

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

  const snap = useSnapshot(state);

  const handleScrollStart = () => {
    canvasRef.current?.resetCurrentPoints();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
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
        <Toolbar />
      </View>
        
    </SafeAreaView>
  );
}

/*
      {snap.zoomableCanvas ?   
        <ReactNativeZoomableView
          maxZoom={4}
          minZoom={0.5}
          zoomStep={0.5}
          initialZoom={snap.scale}
          bindToBorders={true}
          panEnabled={true}
          zoomEnabled={true}
          onTransform={handleZoom}
          initialOffsetX={snap.offsetX}
          initialOffsetY={snap.offsetY}
          panBoundaryPadding={0}
          style={{height: 300, padding: 0}}
        >
          
          <GetSketchCanvas canvasRef={canvasRef}/>
        </ReactNativeZoomableView>
      :
        <View style={{alignItems: 'center', height: '100%', justifyContent: 'center'}}>
          <GetSketchCanvas canvasRef={canvasRef}/>
        </View>
      }
*/

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