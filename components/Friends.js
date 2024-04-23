import React, { useState } from "react";
import {View, Text, Image, Button} from 'react-native';
import Canvas from './Canvas'
import { SearchBar } from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Friends() {

    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
        setSearch(search);
    };

    return(
        <>
            <SearchBar
                placeholder="Search Username"
                value={search}
                onChangeText={updateSearch}
                containerStyle={{backgroundColor: 'black'}}
            />
            
            
            <View style={{flexDirection:"row", margin: 10}}>
                <View style={{flexDirection:"row", alignItems: 'center', width: '70%'}}>
                    <Image
                        source={{uri: "https://yt3.googleusercontent.com/V9sqo4C6K-sbjDogTQdWLiyviw2MyGWPiHLjoF3Us71MKb677V3SQ8KqhorzqHMplgedG6iy=s900-c-k-c0x00ffffff-no-rj"}} 
                        style={{height: 50, width: 50, borderRadius: 100, marginRight: 10}}
                    />
                    <Text style={{color: 'white', fontSize: 18}}>
                    MoominMoominMoomin
                    </Text>
                </View>
                <View style={{width: '30%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <TouchableOpacity style={{backgroundColor: 'blue', padding: 10, borderRadius: 50}}>
                        <Text style={{color: 'white', fontSize: 16}}>
                        Request
                        </Text>                
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}