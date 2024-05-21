import {
    Canvas,
    Path,
    SkPath,
    Skia,
    TouchInfo,
    useTouchHandler,
    useCanvasRef
  } from "@shopify/react-native-skia";
  import React, { useCallback, useState } from "react";
  import {
    StyleSheet,
    View,
    Text, 
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
import { state } from '../state';
import uploadSketch from "../api/uploadSketch";
import LoadingModal from "./LoadingModal";
import ErrorModal from "./ErrorModal";
import { useNavigation } from "@react-navigation/native";
import uploadProfilePicture from "../api/uploadProfilePicture";

export default function SketchCanvas({route}) {
  const { forDrawingProfilePic } = route.params || {};
    
  interface PathObject {
      path: SkPath;
      color: string;
      strokeWidth: number;
      timestamp: number;
  }
    const ref = useCanvasRef();
    const [paths, setPaths] = useState<PathObject[]>([]);
    const [removedPaths, setRemovedPaths] = useState([]);
    const navigation = useNavigation();
      
    const [isDrawing, setIsDrawing] = useState(true);

    // handles the start of zoom
    const handleScrollStart = () => {
      if (paths.length >= 2) {
        const path1 = paths[paths.length - 1];
        const path2 = paths[paths.length - 2];
        const diff = path1.timestamp - path2.timestamp;
        if (diff < 0.05) {
          undo2();
        }
        else {
          undo();
        }
      }
      else {
        undo();
      }
      setIsDrawing(false);
    };

    const handleScrollEnd = () => {
      setIsDrawing(true);
    };

    const undo2 = () => {
      if (paths.length > 1) {
        const newPaths = [...paths.slice(0, -2)]; 
        setPaths(newPaths);
      }
    }

    const undo = () => {
      if (paths.length > 0) {
        const removedPath = paths[paths.length - 1];
        const newPaths = [...paths.slice(0, -1)]; 
        const newRemovedPaths = [...removedPaths, removedPath];
        setPaths(newPaths);
        setRemovedPaths(newRemovedPaths);
      }
    };

    const reset = () => {
      const removedOldPath = [...paths.slice(0)];
      const newRemovedPaths = [...removedPaths, removedOldPath];
      setRemovedPaths(newRemovedPaths);
      setPaths([]);
    };

    const redo = () => {
      if (removedPaths.length > 0) {
        const addBack = removedPaths[removedPaths.length - 1];
        if (Array.isArray(addBack)) {
          // redo reset
          setPaths(addBack);
          const newRemovedPaths = [...removedPaths.slice(0, -1)];
          setRemovedPaths(newRemovedPaths);
        }
        else {
          // redo a drawing
          const newRemovedPaths = [...removedPaths.slice(0, -1)];
          const newPaths = [...paths, addBack];
          setPaths(newPaths);
          setRemovedPaths(newRemovedPaths);
        }
      }
    }

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const upload = async () => {
      setLoading(true);
      const image = ref.current?.makeImageSnapshot();
      const format = 0;
      const quality = 0.5;
      try {
          const base64 = image.encodeToBase64(
            format,
            quality,
          );
          if (forDrawingProfilePic) {
            await uploadProfilePicture(base64);
            navigation.goBack();
          }
          else {
            await uploadSketch(base64);
            navigation.goBack();
          }
          return;
        } catch (error) {
          setLoading(false);
          setTimeout(() => {
            setVisible(true);
          }, 300);      
          console.log(error);
          throw error;
        }
    }
  
    const onDrawingStart = useCallback((touchInfo: TouchInfo) => {
      if (!isDrawing) return;
      setPaths((old) => {
        const { x, y } = touchInfo;
        const newPath = Skia.Path.Make();
        newPath.moveTo(x, y);
        const newPathObject: PathObject = {
          path: newPath,
          color: state.strokeColor,
          strokeWidth: state.strokeWidth,
          timestamp: touchInfo.timestamp
        };
        return [...old, newPathObject];
      });
    }, []);
  
    const onDrawingActive = useCallback((touchInfo: TouchInfo) => {
      setPaths((currentPaths) => {
        const { x, y } = touchInfo;
        const currentPathObject = currentPaths[currentPaths.length - 1];
        const currentPath = currentPathObject.path;
        const lastPoint = currentPath.getLastPt();
        const xMid = (lastPoint.x + x) / 2;
        const yMid = (lastPoint.y + y) / 2;
  
        currentPath.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);

        const newPathObject: PathObject = {
          path: currentPath,
          color: currentPathObject.color,
          strokeWidth: currentPathObject.strokeWidth,
          timestamp: currentPathObject.timestamp,
        };
        return [...currentPaths.slice(0, currentPaths.length - 1), newPathObject];
      });
    }, []);

    const touchHandler = useTouchHandler(
      {
        onActive: onDrawingActive,
        onStart: onDrawingStart,
      },
      [onDrawingActive, onDrawingStart]
    );
  
    return (
      <>
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
        <LoadingModal visible={loading} /> 
        <ErrorModal visible={visible} message={"Could not upload sketch. Please try again later."} onClose={() => {setVisible(false)}} />
      </View> 
      <ScrollView 
      bounces={false}
      bouncesZoom={false}
      maximumZoomScale={4}
      minimumZoomScale={1}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false} 
      onScrollBeginDrag={handleScrollStart}
      onScrollEndDrag={handleScrollEnd}
      scrollEventThrottle={10}
      style={{width: '100%'}}
      contentContainerStyle={{alignItems:'center'}}
      >  
        <View style={{alignItems: 'center', height: 350, width: 350, backgroundColor: 'white'}}>
          <Canvas style={styles.containerr} onTouch={touchHandler} ref={ref}>
            {paths.map((pathObject, index) => (
              <Path
                key={index}
                path={pathObject.path}
                color={pathObject.color}
                style={"stroke"}
                strokeWidth={pathObject.strokeWidth}
              />
            ))}
        </Canvas>
        </View>   
      </ScrollView>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    containerr: {
      width: '100%',
      aspectRatio: 1,
    },
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