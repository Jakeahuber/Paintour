import React, {useState} from "react";
import {Modal, View, Text, Image, StyleSheet, ScrollView, FlatList, SafeAreaView, TouchableHighlight, Touchable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Profile({ navigation }) {

    const data = [{id:1, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:2, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:3, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:4, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:5, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'}, 
    {id:6, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:7, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:8, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:9, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:10, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'}, 
    {id:11, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:12, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:13, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:14, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:15, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'}, 
    {id:16, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:17, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:18, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:19, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:20, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'}, 
    {id:21, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:22, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:23, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:24, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:25, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'}, 
    {id:26, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},
    {id:27, url:'https://2.bp.blogspot.com/_SiA_UGC8DNw/TMHWIv94ZFI/AAAAAAAABAM/xqRkzP1BQgQ/s1600/m-220dg.jpg'},

]; 

    const pfpUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN5CYL8eA2hthmc4cShuQ_y3DovqpV4-i8-g&usqp=CAU';
    const numberOfCols = 3;
    const [postDisplay, setPostDisplay] = useState('none');

    const getProfileInfo = () => {
        return                 <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.contentContainer}>
            <View style={styles.userInfoContainer}>
                <Image
                    style={styles.profilePicture}
                    source={{ uri: pfpUrl}}
                />
                <Text style={{marginLeft: 3, marginTop: 10, fontSize: 22, color: 'white'}}>Jakeahuber</Text>  
                <Text style={{marginLeft: 3, marginTop: 10, fontSize: 14, color: 'white'}}>Edit Profile</Text>  

            </View>
            <View style={{width: '100%', marginTop: 15}}>
                <View>
                    <View style={{flexDirection:"row"}}>
                        <View style={{flex:1, alignItems: 'center'}}>
                            <Text style={{justifyContent: 'flex-start',fontSize: 24, color: 'white'}}>20</Text>
                            <Text style={{justifyContent: 'flex-start',fontSize: 14, color: 'white'}}>Friends</Text>
                        </View>
                        <View style={{flex:1, alignItems: 'center'}}>
                            <Text style={{justifyContent: 'flex-end',fontSize: 24, color: 'white'}}>27</Text>
                            <Text style={{justifyContent: 'flex-start',fontSize: 14, color: 'white'}}>Sketches</Text>
                        </View>
                        <View style={{flex:1, alignItems: 'center'}}>
                            <Text style={{justifyContent: 'flex-end',fontSize: 24, color: 'white'}}>7</Text>
                            <Text style={{justifyContent: 'flex-start',fontSize: 14, color: 'white'}}>Day Streak</Text>
                        </View>
                    </View>
                </View>

            </View>
        </View>
        </ScrollView>    
    };

    const getPosts = () => {
        return <FlatList
            style={styles.sketchGrid}
            data={data}
            numColumns={numberOfCols}
            renderItem={({item})=>(
                <TouchableHighlight style={styles.sketchContainer} onPress={() => {
                    navigation.setOptions({headerTitle: () => (
                        <Ionicons name="arrow-back" size={24} color="white" />
                      ),})
                    //setModalVisible(true);
                    setPostDisplay('flex');
                }}>
                    <Image style={styles.sketch} source={{uri:item.url}} />
                </TouchableHighlight>
            )}
        />       
    };

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>   
            <FlatList
            data={data}
            ListHeaderComponent={getProfileInfo}
            ListFooterComponent={getPosts}
            />
        
        
          <View style={{backgroundColor: 'black', height: '100%', display: postDisplay}}>
            <View>
              <TouchableHighlight
                onPress={() => {
                  setPostDisplay('none')
                  navigation.setOptions({ headerTitle: "My Profile"})
                }}>
                <Text style={{color: 'white', fontSize: 25}}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1, 
    },
    contentContainer: {
        alignItems: 'center',
        backgroundColor: 'black',
        marginBottom: 20
    },
    profilePicture: {
        width: 125, 
        height: 125, 
        borderRadius: 125 / 2, 
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: 'white',
    },
    userInfoContainer: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        zIndex: 1,
    },
    sketchContainer: {
        flex: 1,
        flexWrap:'wrap',
        justifyContent: 'center',
        flexDirection: 'row',
      },
    sketch: {
        justifyContent: 'center',
        height: 120,
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
      },
    sketchGrid: {
        marginLeft: 0,
        marginRight: 0,
    }
  });

