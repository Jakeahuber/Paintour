import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";
import {ActivityIndicator, View, Text, Image, ScrollView, FlatList} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import {getUser} from '../getUser';
import LoadingModal from "./LoadingModal";

export default function FriendsList() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const nextPageIdentifierRef = useRef();
    const [isFirstPageReceived, setIsFirstPageReceived] = useState(false);

    const fetchData = () => {
        setIsLoading(true);
        getDataFromApi(nextPageIdentifierRef.current).then((response) => {
          const newData = response.data;
          const nextPageIdentifier = response.nextPageIdentifier;
          setData([...data, ...newData]);
          nextPageIdentifierRef.current = nextPageIdentifier;
          setIsLoading(false);
          !isFirstPageReceived && setIsFirstPageReceived(true);
        });
    };

    const fetchNextPage = () => {
        if (nextPageIdentifierRef.current == null) {
          return;
        }
        fetchData();
      };

    const getDataFromApi = () => {
        return Promise.resolve({ data: [
        {
            "username": "moomin",
            "profilePicture": "https://yt3.googleusercontent.com/V9sqo4C6K-sbjDogTQdWLiyviw2MyGWPiHLjoF3Us71MKb677V3SQ8KqhorzqHMplgedG6iy=s900-c-k-c0x00ffffff-no-rj",
            "uid": "fake",
        }
        , {
          "username": "moopp",
          "profilePicture": "https://yt3.googleusercontent.com/V9sqo4C6K-sbjDogTQdWLiyviw2MyGWPiHLjoF3Us71MKb677V3SQ8KqhorzqHMplgedG6iy=s900-c-k-c0x00ffffff-no-rj",
          "uid": "fake",
        }
      ], nextPageIdentifier: "page-1" });
    };

    useEffect(() => {
        fetchData();
      }, []);

    const navigation = useNavigation();

    const handleFriendPress = async (uid) => {
      try {
        setLoading(true); 
        const userData = await getUser(uid);
        navigation.navigate('Profile', { userData });
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  
      const renderItem = ({ item }) => {
        return (
          <TouchableOpacity onPress={() => handleFriendPress(item.uid)}>
            <View style={{flexDirection:"row", margin: 10}}>
              <View style={{flexDirection:"row", alignItems: 'center', width: '100%'}}>
                  <Image
                      source={{uri: item.profilePicture}}
                      style={{height: 50, width: 50, borderRadius: 100, marginRight: 10}}
                  />
                    <Text style={{color: 'white', fontSize: 18}}>
                      {item.username}
                    </Text>
              </View>
          </View>  
        </TouchableOpacity>
        )
      };
    
      const ListEndLoader = () => {
        if (isLoading) {
          // Show loader at the end of list when fetching next page data.
          return <ActivityIndicator color={"white"} size={'large'} />;
        }
      };
    
      if (!isFirstPageReceived && isLoading) {
        // Show loader when fetching first page data.
        return <ActivityIndicator color={"white"} size={'large'} />;
      }

    return(
        <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{paddingBottom: 10}}> 
                <Text style={{color: 'white', fontSize: 28}}>My Friends</Text>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                onEndReached={fetchNextPage}
                onEndReachedThreshold={0.8}
                ListFooterComponent={ListEndLoader} // Loader when loading next page.
            />   
            <LoadingModal visible={loading} />        
        </View>
    )
}