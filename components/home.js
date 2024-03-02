import React from "react";
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import Sketches from './Sketches'
import { state } from '../state';
import { useSnapshot } from 'valtio';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

function Home(props) {
    const navigation = useNavigation();
    const snap = useSnapshot(state);

    const handlePhoneNumberSubmit = () => {
        navigation.navigate('Canvas');
    };

    return(
        <>
            {snap.uploadedToday ?
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <View style={{maxWidth: 750}}>
                        <Sketches sketches={props.sketches} />
                    </View>
                </ScrollView>
            :
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <View style={styles.container}>
                        <View style={styles.content}>
                            <Text style={{color: 'white', marginBottom: 20}}>You have not created a sketch within 24 hours :(</Text>
                            <Button title="Create Sketch" onPress={() => navigation.navigate('Canvas')} />
                        </View>
                    </View>
                </ScrollView>
            }
        </>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1, 
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'black', // Set your background color
      },
      content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      },
});

export default Home;

