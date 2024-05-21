import React from "react";
import Sketch from './Sketch'
import { state } from '../state';
import { useSnapshot } from 'valtio';

import {useWindowDimensions, View, Text, Image, FlatList, StyleSheet} from 'react-native';

export default function Sketches() {

  const snap = useSnapshot(state);
  const width = useWindowDimensions().width;

  if (snap.friendSketches.length == 0) {
      return (
        <View style={styles.container}>
          <View style={styles.container}>
            <View style={styles.content}>
                <Image source={require('../assets/nofriendsyet.gif')} style={styles.image}/>
                <Text style={{color: 'white', marginBottom: 60, fontSize: 24}}>
                    No Friends Have Posted
                </Text>
            </View>
          </View>
        </View>
      )
  }

  return(
    <View>
        <View style={{marginBottom: 20}}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 22 }}>Today's Prompt:</Text>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 28 }}>{snap.prompt}</Text>
        </View>
        <FlatList
            data={snap.friendSketches}
            keyExtractor={(item) => item.uid}
            renderItem={({ item }) => (
                <Sketch
                  image={item.image}
                  profilePicture={item.profilePicture}
                  uid={item.uid}
                  uploadTime={item.uploadTime}
                  username={item.username}
                />
            )}
            horizontal={true}
            snapToAlignment="center"
            decelerationRate={"slow"}
            snapToInterval={width}
            showsHorizontalScrollIndicator={false}
            disableIntervalMomentum={false}
        />            
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
  },
  content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
  },
  image: {
      width: 300,
      height: 300,
  }
});
