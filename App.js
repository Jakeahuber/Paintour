import 'react-native-gesture-handler';
import React, {useRef} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import Friends from './components/Friends'
import EditProfile from './components/EditProfile'
import FocusedSketch from './components/FocusedSketch'
import Canvas from './components/Canvas'
import PhoneVerificationScreen from './components/PhoneVerificationScreen'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import { state } from './state';
import { useSnapshot } from 'valtio';
import dummyData from './dummydata';
import { SketchCanvasRef } from 'rn-perfect-sketch-canvas';
import {Text, TouchableOpacity } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from './firebaseconfig'

const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Used signed in");
    state.uid = user.uid;
    state.username = user.displayName;
    state.profilePicUrl = user.photoURL;
    console.log(user);
    // ...
  } else {
    // User is signed out
    // ...
    console.log("User signed out.");
  }
});

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

const screenOptions = () => {
    return {
        headerTitleStyle: {
            color: 'white',
            fontSize: 28,
        },
        headerTitleAlign: 'left',
        headerTintColor: 'white',
        headerBackTitle: null,
    };
};

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName={"HomeScreen"} screenOptions={screenOptions()}>
            <Stack.Screen   name={"HomeScreen"} 
                            children={()=><Home sketches={dummyData.friendSketches}/>}        
                            options={{headerTitle: 'doolee'}}
            />
            <Stack.Screen name={"Canvas"} component={Canvas} options={{headerTitle: '', gestureEnabled: false}}/>
            <Stack.Screen name={"Profile"} component={Profile} options={{headerTitle: ''}}/>
            <Stack.Screen name={"FocusedSketchScreen"} component={FocusedSketch} options={{headerTitle: ''}}/>
        </Stack.Navigator>
    )
}

const MyProfileStack = () => {
    return (
        <Stack.Navigator initialRouteName={"MyProfileScreen"} screenOptions={screenOptions()}>
            <Stack.Screen name={'MyProfileScreen'} 

            options={({ navigation }) => ({
                headerTitle: dummyData.username,
                headerRight: () => (
                  <TouchableOpacity
                    style={{ marginRight: 10 }}
                    onPress={() => navigation.navigate('EditProfileScreen')} // Navigate to the edit profile screen
                  >
                    <Ionicons name="ellipsis-horizontal" size={30} color="white" />
                  </TouchableOpacity>
                ),
              })}

            children={()=> <MyProfile   username={dummyData.username} 
                                        profilePicture={dummyData.profilePicture}
                                        numFriends={dummyData.numFriends}
                                        numSketches={dummyData.numSketches}
                                        streak={dummyData.streak}
                                        sketches={dummyData.mySketches}
                            />}   
            />
            <Stack.Screen name={'EditProfileScreen'}
                          options={{headerTitle: ''}}
                          children = {() => <EditProfile username={dummyData.username} profilePicture={dummyData.profilePicture}/>}
            />
            <Stack.Screen name={"FocusedSketchScreen"} component={FocusedSketch} options={{headerTitle: ''}}/>
        </Stack.Navigator>
    ) 
}

const FriendsStack = () => {
    return (
        <Stack.Navigator initialRouteName={"FriendsScreen"} screenOptions={screenOptions()}>
            <Stack.Screen   name={"FriendsScreen"} 
                            children={()=><Friends />}        
                            options={{headerTitle: 'Friends'}}
            />
        </Stack.Navigator>
    )
}

export function TabNavigator() {
    return (
        <Tab.Navigator initialRouteName={"Home"} screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if (route.name === "Home") {
                    iconName = focused ? 'home' : 'home-outline'
                }
                else if (route.name === "MyProfile") {
                    iconName = focused ? 'person' : 'person-outline'
                }
                else if (route.name === "Friends") {
                    iconName = focused ? 'people' : 'people-outline'
                }
                return <Ionicons name={iconName} size={size} color={color}/>
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
                backgroundColor: 'black',
            },
            headerShown: false,
        })}
        >
            <Tab.Screen name={"Home"} 
                        component={HomeStack}     
            />
            <Tab.Screen name={"MyProfile"} 
                        component={MyProfileStack}
                        />
            <Tab.Screen name={"Friends"}
                        component={FriendsStack}
                        />
        </Tab.Navigator>
     )
  }

export default function App() { 

    const snap = useSnapshot(state);
    console.log(snap.uid);
    return (
        <>
        {(snap.uid != null) ?  
            <NavigationContainer theme={{colors: {background: 'black'}}}>
                <TabNavigator />
            </NavigationContainer>
        :           
            <NavigationContainer theme={{colors: {background: 'black'}}}>
                <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerTitle: 'doolee', headerTransparent: true, headerTintColor: 'white', 
                headerTitleStyle: {fontSize: 28}}}>
                    <Stack.Screen name="SignIn" component={SignIn} options={{headerLeft: null}}/>
                    <Stack.Screen name="SignUp" component={SignUp} options={{headerLeft: null}}/>
                </Stack.Navigator>
            </NavigationContainer>
        }
        </>
    )
}
