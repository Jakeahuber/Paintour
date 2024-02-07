import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import Friends from './components/Friends'
import EditProfile from './components/EditProfile'

const data = {
    friendSketches: [
        {
            id: 2, 
            uploader: 'MonkiMonke', 
            profilePicture: 'https://pics.craiyon.com/2023-11-23/tHv-Fa34Ru6OnUfm35WJ4g.webp', 
            sketch: 'https://www.dryeco.com/wp-content/uploads/2015/10/400x4005.png',
            uploadAgoTime: '4h',
        },
        {
            id: 3, 
            uploader: 'MacbookPro', 
            profilePicture: 'https://specials-images.forbesimg.com/imageserve/62b3234d9c87d569507a1f0d/Apple-MacBook-Pro-13-inch-/960x0.jpg?fit=scale', 
            sketch: 'https://www.dryeco.com/wp-content/uploads/2015/10/400x4005.png',
            uploadAgoTime: '9h',
        },
        {
            id: 4, 
            uploader: 'FortniteFella', 
            profilePicture: 'https://static.wikia.nocookie.net/fortnite_gamepedia/images/d/dd/RecruitJonesy_Chapter_1.png/revision/latest/smart/width/250/height/250?cb=20191028202138', 
            sketch: 'https://www.dryeco.com/wp-content/uploads/2015/10/400x4005.png',
            uploadAgoTime: '23h',
        }
    ],
    mySketches: [
        {
            id: 5, 
            uploader: 'Jakeahuber', 
            profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN5CYL8eA2hthmc4cShuQ_y3DovqpV4-i8-g&usqp=CAU', 
            sketch: 'https://www.dryeco.com/wp-content/uploads/2015/10/400x4005.png',
            uploadAgoTime: '2h',
        },
        {
            id: 6, 
            uploader: 'Jakeahuber', 
            profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN5CYL8eA2hthmc4cShuQ_y3DovqpV4-i8-g&usqp=CAU', 
            sketch: 'https://www.dryeco.com/wp-content/uploads/2015/10/400x4005.png',
            uploadAgoTime: '2h',
        },
        {
            id: 7, 
            uploader: 'Jakeahuber', 
            profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN5CYL8eA2hthmc4cShuQ_y3DovqpV4-i8-g&usqp=CAU', 
            sketch: 'https://www.dryeco.com/wp-content/uploads/2015/10/400x4005.png',
            uploadAgoTime: '2h',
        },
        {
            id: 8, 
            uploader: 'Jakeahuber', 
            profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN5CYL8eA2hthmc4cShuQ_y3DovqpV4-i8-g&usqp=CAU', 
            sketch: 'https://www.dryeco.com/wp-content/uploads/2015/10/400x4005.png',
            uploadAgoTime: '2h',
        }
    ],
    username: 'jakeahuber',
    numFriends: 20,
    numSketches: 4,
    streak: 4,
    profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN5CYL8eA2hthmc4cShuQ_y3DovqpV4-i8-g&usqp=CAU'
}   

const homeName = 'Home';
const myProfileName = 'MyProfile';
const friendsName = 'Friends';
const editProfileName = 'EditProfile'
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName={homeName}>
            <Stack.Screen   name={homeName} 
                            children={()=><Home sketches={data.friendSketches}/>}        
            />
        </Stack.Navigator>
    )
}

const MyProfileStack = () => {
    return (
        <Stack.Navigator initialRouteName={homeName}>
            <Stack.Screen name={'MyProfileScreen'} 
            options={{headerTitle: 'My Profile'}}
            children={()=> <MyProfile   username={data.username} 
                                        profilePicture={data.profilePicture}
                                        numFriends={data.numFriends}
                                        numSketches={data.numSketches}
                                        streak={data.streak}
                                        sketches={data.mySketches}
                            />}   
            />
            <Stack.Screen name={'EditProfileScreen'}
                          options={{headerTitle: 'Edit Profile'}}
                          children = {() => <EditProfile />}
            />
        </Stack.Navigator>
    ) 
}

export function TabNavigator() {
    return (
        <Tab.Navigator initialRouteName={homeName} screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if (route.name === homeName) {
                    iconName = focused ? 'home' : 'home-outline'
                }
                else if (route.name === myProfileName) {
                    iconName = focused ? 'person' : 'person-outline'
                }
                else if (route.name === friendsName) {
                    iconName = focused ? 'people' : 'people-outline'
                }
                return <Ionicons name={iconName} size={size} color={color}/>
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
                backgroundColor: 'black',
            },
            headerTitleStyle: {
                color: 'white',
                fontSize: 28
            },
            headerTitleAlign: 'left',
            headerShown: false,
        })}
        >
            <Tab.Screen name={homeName} 
                        component={HomeStack}     
            />
            <Tab.Screen name={myProfileName} 
                        component={MyProfileStack}
                        />
            <Tab.Screen name={friendsName} component={Friends} options={{headerTitle: 'Friends'}}/>
        </Tab.Navigator>
     )
  }

export default function App() {
  return (
    <>
        <NavigationContainer theme={{colors: {background: 'black'}}}>
            <TabNavigator />
        </NavigationContainer>
    </>
  )
}
