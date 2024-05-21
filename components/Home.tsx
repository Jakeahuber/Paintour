import React, {useState, useCallback} from "react";
import {StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, RefreshControl} from 'react-native';
import Sketches from './Sketches'
import { state } from '../state';
import { useSnapshot } from 'valtio';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { getUser } from "../api/getUser";
import { updateMyData } from "../api/updateMyData";
import ErrorModal from "./ErrorModal";
import { getFriendSketches } from "../api/getFriendSketches";

function Home() {
    const navigation = useNavigation();
    const snap = useSnapshot(state);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const setModalInvisible = () => {
        setErrorModalVisible(false);
    }

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
          const userData = await getUser(state.uid);
          updateMyData(userData);
          await getFriendSketches(state.uid);
          setRefreshing(false);
        } catch (error) {
          setRefreshing(false);
          setTimeout(() => {
            setErrorModalVisible(true);
          }, 500);
        }
    }, []);

    if (!snap.uploadedToday) {
        return (
            <ScrollView contentContainerStyle={styles.scrollViewContainer} 
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        showsVerticalScrollIndicator={false}
                        horizontal={false}
                        testID="scrollView"
            >
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Image source={require('../assets/drawing.gif')} style={styles.image}/>
                        <Text testID="noSketchToday" style={{color: 'white', marginBottom: 20, fontSize: 22, textAlign: 'center'}}>
                        You have not created a sketch today!
                        </Text>
                        <TouchableOpacity style={{backgroundColor: '#4681f4', paddingLeft: 15, paddingTop: 10, paddingBottom: 10, paddingRight: 15, borderRadius: 50}} 
                                          onPress={() => navigation.navigate("Canvas")}>
                            <Text style={{color: 'white', fontSize: 16}}>Create Sketch</Text>                
                        </TouchableOpacity>
                    </View>
                </View>
                <ErrorModal message="Could not refresh. Please try again later." visible={errorModalVisible} onClose={setModalInvisible}/>
            </ScrollView>
        )
    }
    else if (snap.numFriends == 0 && snap.uploadedToday) {
        return (
            <ScrollView contentContainerStyle={styles.scrollViewContainer} 
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        showsVerticalScrollIndicator={false}
                        horizontal={false}
            >
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Image source={require('../assets/nofriendsyet.gif')} style={styles.image}/>
                        <Text style={{color: 'white', marginBottom: 20}}>You don't have any friends yet :(</Text>
                        <Button title="Add Friends" onPress={() => navigation.navigate('Friends', { screen: 'FriendsScreen' })} />
                    </View>
                </View>
                <ErrorModal message="Could not refresh. Please try again later." visible={errorModalVisible} onClose={setModalInvisible}/>
            </ScrollView>
        )
    }
    else {
        return (
            <ScrollView contentContainerStyle={styles.scrollViewContainer}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        showsVerticalScrollIndicator={false}
                        horizontal={false}
            >
                <Sketches />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1, 
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: -50
    },
    image: {
        width: 300,
        height: 300,
    }
});

export default Home;