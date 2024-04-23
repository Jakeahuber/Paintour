import React, {useState, useEffect} from "react";
import {StyleSheet, TouchableHighlight, Image, Dimensions, Text, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';
import {getUserSketches} from '../getUserSketches';
import { useSnapshot } from "valtio";
import { state } from "../state";

const width = Dimensions.get('window').width;
const actualImageHeight = 1020;
const actualImageWidth = 1020;

function CalendarImages(props) {    
    const snap = useSnapshot(state);
    const uid = props.uid;
    const navigation = useNavigation();
    const currentDateUTC = new Date();
    const currentDateEST = new Date(currentDateUTC.getTime() - (5 * 60 * 60 * 1000));
    const [currentMonth, setCurrentMonth] = useState(currentDateEST.getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(currentDateEST.getFullYear());
    const [currentSketches, setCurrentSketches] = useState({});
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const sketches = await getUserSketches(uid, currentMonth, currentYear);
            setCurrentSketches(sketches);
          } catch (error) {
            console.error('Error fetching sketches:', error);
          }
        };
        fetchData();
    }, [snap.forceUserSketchesUpdate, currentMonth, currentYear]);

    const [timerId, setTimerId] = useState(null);
    const [scrolling, setScrolling] = useState(false);

    const handleMonthChange = (date) => {
        clearTimeout(timerId);
        if (!scrolling) {
            setScrolling(true);
            setCurrentSketches({});
        }
        const newTimerId = setTimeout(() => {
            const month = date.month; 
            const year = date.year;
            setCurrentMonth(month);
            setCurrentYear(year);
            setScrolling(false);
        }, 1); 
        setTimerId(newTimerId);
    }

    return (
        <View>
            <Calendar
                style={{height: 340, backgroundColor: 'black', color: 'white'}}
                dayComponent={({date, state}) => {
                        if (currentSketches && currentSketches.hasOwnProperty(date.day)) {
                            const item = currentSketches[date.day];
                            return (
                                <TouchableHighlight 
                                    onPress={() => {
                                        navigation.navigate('FocusedSketchScreen', {
                                            image: item.image,
                                            profilePicture: item.profilePicture,
                                            uid: item.uid,
                                            uploadTime: item.uploadTime,
                                            username: item.username,
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
                //minDate={'2024-01-01'}
                //maxDate={currentDateUTC}
                theme = {{
                    calendarBackground: "black",
                    monthTextColor: 'white',
                    arrowColor: 'white',
                    dayTextColor: 'white'
                }}
                onMonthChange={handleMonthChange}                
            />
        </View>
    );
}

const styles = StyleSheet.create({
    sketchContainer: {
        flexDirection: 'row',
      },
    sketchGrid: {
        marginLeft: 0,
        marginRight: 0,
    },
    sketch: {
        aspectRatio: actualImageWidth / actualImageHeight, 
        width: width / 3,
        borderColor: 'black',
        borderWidth: 1,
    },
});

export default CalendarImages;
