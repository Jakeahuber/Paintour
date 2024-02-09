import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView, Button } from 'react-native';
import { SketchCanvas, SketchCanvasRef } from 'rn-perfect-sketch-canvas';

export default function Canvas() {
    const canvasRef = useRef<SketchCanvasRef>(null);

    return (
      <SafeAreaView style={{flex: 1}}>
        <SketchCanvas
          ref={canvasRef}
          strokeColor={'black'}
          strokeWidth={8}
          containerStyle={styles.container}
        />
        <Button onPress={canvasRef.current?.reset} title="Reset" />
        <Button onPress={canvasRef.current?.undo} title="Undo" />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 400,
    width: 400,
  },
});