import React from "react";
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';

export default function Home({navbar}) {

    const imageUrl = './sketch-example.png';
    const pfpUrl = 'data:image/jpeg;base64,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';

    return(
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.postContainer}>           
                    <View style={styles.authorContainer}>
                        <Image
                            style={styles.profilePicture}
                            source={{ uri: pfpUrl}}
                        />
                        <Text style={{marginLeft: 3, marginTop: 10, fontSize: 18, color: 'white'}}>Jakeahuber at 12:30 PM</Text>                     
                    </View>
                    <Image
                    style={styles.sketch}
                    source={require(`${imageUrl}`)}
                    />
                </View>

                <View style={styles.postContainer}>           
                    <View style={styles.authorContainer}>
                        <Image
                            style={styles.profilePicture}
                            source={{ uri: pfpUrl}}
                        />
                        <Text style={{marginLeft: 3, marginTop: 10, fontSize: 18, color: 'white'}}>Jakeahuber at 12:30 PM</Text>                     
                    </View>
                    <Image
                    style={styles.sketch}
                    source={require(`${imageUrl}`)}
                    />
                </View>
                <View style={styles.postContainer}>           
                    <View style={styles.authorContainer}>
                        <Image
                            style={styles.profilePicture}
                            source={{ uri: pfpUrl}}
                        />
                        <Text style={{marginLeft: 3, marginTop: 10, fontSize: 18, color: 'white'}}>Jakeahuber at 12:30 PM</Text>                     
                    </View>
                    <Image
                    style={styles.sketch}
                    source={require(`${imageUrl}`)}
                    />
                </View>
                <View style={styles.postContainer}>           
                    <View style={styles.authorContainer}>
                        <Image
                            style={styles.profilePicture}
                            source={{ uri: pfpUrl}}
                        />
                        <Text style={{marginLeft: 3, marginTop: 10, fontSize: 18, color: 'white'}}>Jakeahuber at 12:30 PM</Text>                     
                    </View>
                    <Image
                    style={styles.sketch}
                    source={require(`${imageUrl}`)}
                    />
                </View>
                <View style={styles.postContainer}>           
                    <View style={styles.authorContainer}>
                        <Image
                            style={styles.profilePicture}
                            source={{ uri: pfpUrl}}
                        />
                        <Text style={{marginLeft: 3, marginTop: 10, fontSize: 18, color: 'white'}}>Jakeahuber at 12:30 PM</Text>                     
                    </View>
                    <Image
                    style={styles.sketch}
                    source={require(`${imageUrl}`)}
                    />
                </View>
                <View style={styles.postContainer}>           
                    <View style={styles.authorContainer}>
                        <Image
                            style={styles.profilePicture}
                            source={{ uri: pfpUrl}}
                        />
                        <Text style={{marginLeft: 3, marginTop: 10, fontSize: 18, color: 'white'}}>Jakeahuber at 12:30 PM</Text>                     
                    </View>
                    <Image
                    style={styles.sketch}
                    source={require(`${imageUrl}`)}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1, 
    },
    contentContainer: {
        alignItems: 'center',
        backgroundColor: 'black',

    },
    sketch: {
      width: '90%',
      resizeMode: 'cover',
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 10,
    },
    postContainer: {
        padding: 20, 
        paddingBottom: 30,
        width: '100%',
        alignItems: 'center',
        marginLeft: '5%'
    },
    profilePicture: {
        width: 75, 
        height: 75, 
        borderRadius: 50, 
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: 'white',
    },
    authorContainer: {
        flexDirection: 'row',
        width: '110%',
        marginBottom: -40,
        zIndex: 1,
    }
  });

