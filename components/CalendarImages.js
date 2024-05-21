import React, {useState, useEffect} from "react";
import {TouchableHighlight, Image, Text, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';
import { getSketchesByYear } from "../api/getSketchesByYear";
import { state } from "../state";
import { useSnapshot } from "valtio";
import ErrorModal from "./ErrorModal";

function CalendarImages() {    
    const snap = useSnapshot(state);
    const navigation = useNavigation();
    const currentDateUTC = new Date();
    const currentDateEST = new Date(currentDateUTC.getTime() - (5 * 60 * 60 * 1000));
    const [currentYear, setCurrentYear] = useState(currentDateEST.getFullYear());
    const [currentSketches, setCurrentSketches] = useState({});
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const currentSketches = await getSketchesByYear(state.uid, currentYear);
            setCurrentSketches(currentSketches);
          } catch (error) {
            setCurrentSketches([]);
            setErrorModalVisible(true);
          }
        };
        fetchData();
    }, [currentYear, snap.forceCalendarImagesRerender]);

    const handleMonthChange = (date) => {
        const year = date.year;
        setCurrentYear(year);
    }

    const [errorModalVisible, setErrorModalVisible] = useState(false);

    return (
        <View style={{position: "relative"}}>
            <Calendar
                style={{position: "absolute", height: 340, width: "100%", backgroundColor: 'black', color: 'white'}}
                dayComponent={({date, state}) => {
                        if (currentSketches && currentSketches.hasOwnProperty(date.month) && currentSketches[date.month] && currentSketches[date.month].hasOwnProperty(date.day)) {
                            const item = currentSketches[date.month][date.day];
                            return (
                                <TouchableHighlight 
                                    onPress={() => {
                                        navigation.navigate('FocusedSketchScreen', {
                                            image: item.image,
                                            profilePicture: snap.profilePicture,
                                            uid: item.uid,
                                            uploadTime: item.uploadTime,
                                            username: item.username,
                                            prompt: item.prompt,
                                        })
                                    }}
                                >   
                                    <View style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
                                        <Image
                                        source={{uri: item.image}}
                                        style={{width: 50, height: 50, opacity: 0.6, position: 'relative', borderRadius: 10, backgroundColor: 'white'}}/>      
                                        <Text style={{position: 'absolute', color: 'white', fontSize: 20}}>{date.day}</Text>          
                                    </View>
                                </TouchableHighlight>
                            );
                        }
                        else {
                            return (
                                <View style={{backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
                                    <View style={{width: 50, height: 50, opacity: 0.65, position: 'relative', borderRadius: 10}}/>      
                                    <Text style={{position: 'absolute', color: 'white', fontSize: 20}}>{date.day}</Text>          
                                </View>
                            );
                        }
                }}
                hideExtraDays={true}
                theme = {{
                    calendarBackground: "black",
                    monthTextColor: 'white',
                    arrowColor: 'white',
                    dayTextColor: 'white'
                }}
                onMonthChange={handleMonthChange}                
            />
            <ErrorModal visible={errorModalVisible} onClose={()=>{setErrorModalVisible(false)}} message={"Could not load sketches. Please try again later."}/>
        </View>
    );
}

export default CalendarImages;
