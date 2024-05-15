
import React, {useRef, useState, useEffect} from "react";
import Sketch from './Sketch'
// import { FlatList } from 'react-native-gesture-handler';
import { state } from '../state';
import { useSnapshot } from 'valtio';

import { useNavigation } from "@react-navigation/native";
import {RefreshControl,ActivityIndicator,useWindowDimensions, View, Text, Image, ScrollView, FlatList, StyleSheet} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import {getUser} from '../getUser';
import LoadingModal from "./LoadingModal";
import { getFriendSketches } from "../getFriendSketches";

function Sketches() {

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await getFriendSketches(state.uid);
      const userData = await getUser(state.uid);
      state.uid = userData.uid;
      state.username = userData.username;
      state.profilePicture = userData.profilePicture;
      state.numSketches = userData.numSketches;
      state.numFriends = userData.numFriends;
      state.uploadedToday = userData.uploadedToday;
      state.numRequests = userData.numRequests;
      state.prompt = "A penguin trying to master the art of skateboarding on an icy slope.";
    } catch (error) {
      console.error('Error refreshing friend sketches:', error);
    }
    setRefreshing(false);
  }, []);

  const snap = useSnapshot(state);

  if (snap.friendSketches.length == 0) {
      return (
        <ScrollView contentContainerStyle={styles.container} 
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
        >
          <View style={styles.container}>
            <View style={styles.content}>
                <Image source={require('../nofriendsyet.gif')} style={styles.image}/>
                <Text style={{color: 'white', marginBottom: 60, fontSize: 24}}>
                    No Friends Have Posted
                </Text>
            </View>
          </View>
        </ScrollView>
      )
  }

  const flatListRef = useRef(null);
  const width = useWindowDimensions().width;
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

  const getDataFromApi = async () => {

      return []; await getFriendSketches(state.uid);

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
              <Sketch
                  image={item.image}
                  profilePicture={item.profilePicture}
                  uid={item.uid}
                  uploadTime={item.uploadTime}
                  username={item.username}
              />
          );
        };
      
        const ListEndLoader = () => {
          if (isLoading) {
            // Show loader at the end of list when fetching next page data.
            return <ActivityIndicator color={"white"} size={'large'} st/>;
          }
        };
      
        if (!isFirstPageReceived && isLoading) {
          // Show loader when fetching first page data.
          return <ActivityIndicator color={"white"} size={'large'} />;
        }
  
      return(
          <>
              <View style={{marginBottom: 50}}>
                  <Text style={{ color: 'white', textAlign: 'center', fontSize: 24 }}>Today's Prompt:</Text>
                  <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>{snap.prompt}</Text>
              </View>
              <FlatList
                  ref={flatListRef}
                  data={snap.friendSketches}
                  renderItem={renderItem}
                  horizontal={true}
                  keyExtractor={(item) => item.id}
                  snapToAlignment="center"
                  snapToInterval={width}
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  onEndReached={fetchNextPage}
                  onEndReachedThreshold={0.8}
                  ListFooterComponent={ListEndLoader} // Loader when loading next page.
              />
              <LoadingModal visible={loading} />        
          </>
      )
  }


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'black', // Set your background color
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
  

export default Sketches;

