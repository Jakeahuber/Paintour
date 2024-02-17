import * as React from 'react';
import { useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  useWindowDimensions,
  Text
} from 'react-native';
 
import { SketchCanvas, SketchCanvasRef } from 'rn-perfect-sketch-canvas';
import { useSnapshot } from 'valtio';
import Header from './Header';
import Toolbar from './Toolbar';
import { state } from '../state';

const GetSketchCanvas = ({canvasRef}) => {
  const snap = useSnapshot(state);
  return (
    <>
      {snap.forceReloadToggle ?           
        <SketchCanvas
          strokeColor={"red"}
          strokeWidth={snap.strokeWidth + 1e-10}
          ref={canvasRef}
          containerStyle={styles.container}
        />
      :           
      <SketchCanvas
        strokeColor={"red"}
        strokeWidth={snap.strokeWidth - 1e-10}
        ref={canvasRef}
        containerStyle={styles.container}
      />
     }
   </>
  );

};

export default function Canvas() {
  const { width } = useWindowDimensions();
  const canvasRef = useRef<SketchCanvasRef>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent:"space-between"
        }}
      >
        <Header canvasRef={canvasRef} />
        <View
          style={{
            width: 375,
            height: 375,
            backgroundColor: '#ffffff',
            borderRadius: 10,
            overflow: 'hidden',
            elevation: 1,
          }}
        >
          <GetSketchCanvas canvasRef={canvasRef}/>
        </View>
        <Toolbar />
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
  },
});