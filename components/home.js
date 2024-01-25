import React from "react";
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';


const Home = () => {
    const imageUrl = './sketch-example.png';
    
    const images = [{id: 1, username: 'Jakeahuber', profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN5CYL8eA2hthmc4cShuQ_y3DovqpV4-i8-g&usqp=CAU', sketch: 'todo'},
    {id: 2, username: 'Foo', profilePicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', sketch: 'todo'},
    {id: 3, username: 'Bar', profilePicture: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg', sketch: 'todo'},
    {id: 4, username: 'Abcdefghijklmnopqrstuvwxyz', profilePicture: 'https://images.nationalgeographic.org/image/upload/t_RL2_search_thumb/v1638889927/EducationHub/photos/pebble-beach.jpg', sketch: 'todo'},
    {id: 5, username: 'LoremSup', profilePicture: 'https://www.thesun.co.uk/wp-content/uploads/2023/09/snout-world-meet-lapsha-adorable-847777113-1.jpg', sketch: 'todo'}
];

    return(
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.contentContainer}>
                
                {images.map((item, index) => {
                    return (
                        <View style={styles.postContainer}>           
                            <View style={styles.authorContainer}>
                                <Image
                                    style={styles.profilePicture}
                                    source={{ uri: item.profilePicture}}
                                />
                                <Text style={styles.username}>{item.username}</Text>        
                                <Text style={styles.uploadTime}>2h</Text>                         
                            </View>
                            <Image
                            style={styles.sketch}
                            source={require(`${imageUrl}`)}
                            />
                        </View>
                    );
                }
                    
                )}
            </View>
        </ScrollView>
    );
};

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
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 10,
    },
    postContainer: {
        marginBottom: 20,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    profilePicture: {
        width: 40, 
        height: 40, 
        borderRadius: 50, 
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: 'white',
    },
    authorContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingLeft: '5%',
        marginBottom: 5,
    },
    username: {
        marginLeft: 3, 
        paddingTop: 8, 
        fontSize: 18, 
        color: 'white', 
        justifyContent: 'flex-start'
    },
    uploadTime: {
        marginLeft: 3, 
        fontSize: 14, 
        paddingTop: 12, 
        justifyContent: 'flex-end', 
        color: '#b5b5b5'
    }
});

export default Home;

