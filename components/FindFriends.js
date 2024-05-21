import React, { useState } from "react";
import {View, Text, FlatList} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";
import LoadingModal from "./LoadingModal";
import Friend from "./Friend";
import { searchUsers } from "../api/searchUsers";
import ErrorModal from "./ErrorModal";

export default function FindFriends() {
    const [loading, setLoading] = useState(false);

    const [searchedUsers, setSearchedUsers] = useState([]);

    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
        setSearch(search);
    };

    
    const [message, setMessage] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);

    const closeModal = () => {
        setErrorVisible(false);
    };
    
    const handleSearchPress = async (uid) => {
        try {
            if (search == "") {
                return;
            }
          setLoading(true); 
          const newSearchedUsers = await searchUsers(search);
          setSearchedUsers(newSearchedUsers);
          console.log(newSearchedUsers);
          setLoading(false); 
        } catch (error) {
            setMessage("Search failed unexpectedly. Please try again later.");
            setErrorVisible(true);
            setLoading(false);
        }
    }

    return(
        <View style={{alignItems: 'center', margin: 10}}>
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                        <SearchBar
                    placeholder="Search Username"
                    value={search}
                    onChangeText={updateSearch}
                    containerStyle={{ flex: 7, backgroundColor: 'transparent' }}
                    inputContainerStyle={{ backgroundColor: 'black', borderRadius: 20 }}
                    inputStyle={{ color: 'white' }}
                />
                <View style={{flex: 3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <TouchableOpacity style={{backgroundColor: '#4681f4', paddingLeft: 15, paddingTop: 10, paddingBottom: 10, paddingRight: 15, borderRadius: 50}} onPress={handleSearchPress}>
                        <Text style={{color: 'white', fontSize: 16}}>
                        Search
                        </Text>                
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={searchedUsers}
                keyExtractor={(item) => item.uid}
                renderItem={({ item }) => (
                    <Friend
                        username={item.username}
                        numSketches={item.numSketches}
                        numFriends={item.numFriends}
                        profilePicture={item.profilePicture}
                        friendStatus={item.friendStatus}
                        uid={item.uid}
                    />
                )}
                style={{width: '100%', height: '100%'}}
            />            
            <LoadingModal visible={loading} />
            <ErrorModal visible={errorVisible} message={message} onClose={closeModal} />      
        </View>
    )
}