import React, { MutableRefObject } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import type { SketchCanvasRef } from 'rn-perfect-sketch-canvas';
import { state } from '../state';
import {ParamListBase, useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Props {
  canvasRef: MutableRefObject<SketchCanvasRef | null>;
}
const Header: React.FC<Props> = ({ canvasRef }) => {

  /**
   * Reset the canvas & draw state
   */
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const reset = () => {
    canvasRef.current?.reset();
    state.forceReloadToggle = !state.forceReloadToggle;
  };

  const undo = () => {
    canvasRef.current?.undo();
    state.forceReloadToggle = !state.forceReloadToggle;
  };

  const redo = () => {
    canvasRef.current?.redo();
    state.forceReloadToggle = !state.forceReloadToggle;
  };

  const upload = () => {
    const image = canvasRef.current?.toSvg(375, 375)
    if (image) {
      console.log('SVG', image);
    }
    state.uploadedToday = true;
    navigation.navigate('HomeScreen');
  };

  return (
    <View
      style={{
        height: 50,
        width: '100%',
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={undo}
          style={[styles.button, { marginRight: 10 }]}
        >
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={redo}
          activeOpacity={0.6}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Redo</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          onPress={reset}
          activeOpacity={0.6}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={upload}
          style={[styles.button, { marginLeft: 10 }]}
        >
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    backgroundColor: 'white',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
  },
});

export default Header;