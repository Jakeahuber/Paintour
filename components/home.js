import React from "react";
import {StyleSheet, ScrollView} from 'react-native';
import Sketches from './Sketches'

function Home(props) {
    return(
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Sketches sketches={props.sketches} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1, 
        backgroundColor: 'black'
    }
});

export default Home;

