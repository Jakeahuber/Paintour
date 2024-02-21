import React from "react";
import {StyleSheet, ScrollView, View} from 'react-native';
import Sketches from './Sketches'

function Home(props) {
    return(
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={{maxWidth: 750}}>
                <Sketches sketches={props.sketches} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1, 
        alignItems: 'center'
    }
});

export default Home;

