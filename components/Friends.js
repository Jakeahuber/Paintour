import React, { useState } from "react";
import {View, Text, Image, Button} from 'react-native';
import Canvas from './Canvas'
import { SearchBar } from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { getUser } from "../getUser";
import LoadingModal from "./LoadingModal";

export default function Friends() {

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
        setSearch(search);
    };

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
    
    const handleRequestPress = async (uid) => {
        try {
          setLoading(true); 
          //const userData = await getUser(uid);
          setLoading(false); 
        } catch (error) {
          console.error('Error sending friend request:', error);
        }
    }

    return(
        <>
            <SearchBar
                placeholder="Search Username"
                value={search}
                onChangeText={updateSearch}
                containerStyle={{backgroundColor: 'black'}}
            />
            
            
            <View style={{flexDirection:"row", margin: 10}}>
                <TouchableOpacity onPress={() => handleFriendPress("fake")} 
                    style={{flexDirection:"row", alignItems: 'center', width: '100%'}}>
                    <Image
                        source={{uri: "https://yt3.googleusercontent.com/V9sqo4C6K-sbjDogTQdWLiyviw2MyGWPiHLjoF3Us71MKb677V3SQ8KqhorzqHMplgedG6iy=s900-c-k-c0x00ffffff-no-rj"}} 
                        style={{height: 45, width: 45, borderRadius: 100, marginRight: 10}}
                    />
                    <Text style={{color: 'white', fontSize: 18}}>
                    MoominMoominMoomin
                    </Text>
                </TouchableOpacity>
                <View style={{width: '30%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <TouchableOpacity style={{backgroundColor: 'blue', padding: 10, borderRadius: 50}} onPress={handleRequestPress}>
                        <Text style={{color: 'white', fontSize: 16}}>
                        Request
                        </Text>                
                    </TouchableOpacity>
                </View>
            </View>
            <LoadingModal visible={loading} />        
        </>
    )
}