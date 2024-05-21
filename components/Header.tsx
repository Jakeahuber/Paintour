import React, { MutableRefObject, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import type { SketchCanvasRef } from 'rn-perfect-sketch-canvas';
import { state } from '../state';
import {ParamListBase, useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { getUserSketches } from '../api/getUserSketches';
import {getUser} from '../api/getUser';
import LoadingModal from './LoadingModal';
import ErrorModal from './ErrorModal';

const Header = ({onUpload, navigateOnUpload, onUndo }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const reset = () => {
    //canvasRef.current?.reset();
    state.forceReloadToggle = !state.forceReloadToggle;
  };

  const undo = () => {
    //canvasRef.current?.undo();
    onUndo();
    //state.forceReloadToggle = !state.forceReloadToggle;
  };

  const redo = () => {
    //canvasRef.current?.redo();
    state.forceReloadToggle = !state.forceReloadToggle;
  };

  async function upload() {
    try {
      await onUpload(/*canvasRef*/);
      navigation.navigate(navigateOnUpload);
    } catch (error) {}
  };

  return (
    <View
      style={{
        height: 50,
        width: '100%',
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        alignItems: 'center',
        paddingRight: 25,
        paddingLeft: 25,
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
          style={[styles.button, { marginRight: 10 }]}
        >
          <Text style={styles.buttonText}>Redo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={reset}
          activeOpacity={0.6}
          style={[styles.button, { marginRight: 10 }]}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={upload}
          style={[styles.upload, { marginRight: 10 }]}
        >
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View> 
  );
};

const styles = StyleSheet.create({
  
  button: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upload: {
    paddingHorizontal: 20,
    backgroundColor: '#E0E0E0',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
  },
});

export default Header;