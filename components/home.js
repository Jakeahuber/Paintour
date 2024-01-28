import React from "react";
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import { Dimensions } from 'react-native';

const win = Dimensions.get('window');
const sketchSize = 400;
const ratio = win.width/sketchSize; 

const Home = () => {
    
    const posts = [
        {
            id: 1, 
            username: 'Jakeahuber', 
            profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN5CYL8eA2hthmc4cShuQ_y3DovqpV4-i8-g&usqp=CAU', 
            sketch: 'https://www.dryeco.com/wp-content/uploads/2015/10/400x4005.png',
            uploadAgoTime: '2h',
        },
        {
            id: 2, 
            username: 'MonkiMonke', 
            profilePicture: 'https://pics.craiyon.com/2023-11-23/tHv-Fa34Ru6OnUfm35WJ4g.webp', 
            sketch: 'https://www.dryeco.com/wp-content/uploads/2015/10/400x4005.png',
            uploadAgoTime: '4h',
        },
        {
            id: 3, 
            username: 'MacbookPro', 
            profilePicture: 'https://specials-images.forbesimg.com/imageserve/62b3234d9c87d569507a1f0d/Apple-MacBook-Pro-13-inch-/960x0.jpg?fit=scale', 
            sketch: 'https://www.dryeco.com/wp-content/uploads/2015/10/400x4005.png',
            uploadAgoTime: '9h',
        },
        {
            id: 4, 
            username: 'FortniteFella', 
            profilePicture: 'https://static.wikia.nocookie.net/fortnite_gamepedia/images/d/dd/RecruitJonesy_Chapter_1.png/revision/latest/smart/width/250/height/250?cb=20191028202138', 
            sketch: 'https://www.dryeco.com/wp-content/uploads/2015/10/400x4005.png',
            uploadAgoTime: '23h',
        },
    ]

    return(
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.contentContainer}>
                
                {posts.map((item, index) => {
                    return (
                        <View style={styles.postContainer}>           
                            <View style={styles.authorContainer}>
                                <Image
                                    style={styles.profilePicture}
                                    source={{ uri: item.profilePicture}}
                                />
                                <Text style={styles.username}>{item.username}</Text>        
                                <Text style={styles.uploadTime}>{item.uploadAgoTime}</Text>                         
                            </View>
                            <Image
                                style={styles.sketch}
                                source={{ uri: item.sketch}}
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
      height: sketchSize * ratio,
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

