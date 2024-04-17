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
import FocusedSketch from './components/FocusedSketch'
import Canvas from './components/Canvas'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import { state } from './state';
import { useSnapshot } from 'valtio';
import {TouchableOpacity } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from './firebaseconfig'

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    getUser(user.uid);
    getUserSketches(user.uid);
    getFriendSketches(user.uid);
  } else {
    resetUser();
  }
});

const resetUser = () => {
    state.uid = "",
    state.username = "",
    state.profilePicture = "",
    state.streak = -1,
    state.numSketches = -1,
    state.numFriends = -1
}

const getUser = (uid) => {
    const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/getUser";
    const url = `${endpoint}?uid=${uid}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
        state.uid = data.uid,
        state.username = data.username,
        state.profilePicture = data.profilePicture,
        state.streak = data.streak,
        state.numSketches = data.numSketches,
        state.numFriends = data.numFriends
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

const getUserSketches = (uid) => {
    const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/getSketchesByUID";
    const url = `${endpoint}?uid=${uid}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
        state.userSketches = data
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

const getFriendSketches = (uid) => {
    const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/getFriendSketches";
    const url = `${endpoint}?uid=${uid}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
        state.friendSketches = data
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

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
            <Stack.Screen name={"HomeScreen"} component={Home} options={{headerTitle: 'doolee'}}/>
            <Stack.Screen name={"Canvas"} component={Canvas} options={{headerTitle: '', gestureEnabled: false}}/>
            <Stack.Screen name={"Profile"} component={Profile} options={{headerTitle: ''}}/>
            <Stack.Screen name={"FocusedSketchScreen"} component={FocusedSketch} options={{headerTitle: ''}}/>
        </Stack.Navigator>
    )
}

const MyProfileStack = () => {
    return (
        <Stack.Navigator initialRouteName={"MyProfileScreen"} screenOptions={screenOptions()}>
            <Stack.Screen   name={'MyProfileScreen'} 
                            component={MyProfile}
                            options={({ navigation }) => ({
                                headerTitle: state.username,
                                headerRight: () => (
                                    <TouchableOpacity
                                        style={{ marginRight: 10 }}
                                        onPress={() => navigation.navigate('EditProfileScreen')}
                                    >
                                        <Ionicons name="ellipsis-horizontal" size={30} color="white" />
                                    </TouchableOpacity>
                                ),
                            })}
            />
            <Stack.Screen name={"EditProfileScreen"} component={EditProfile} options={{headerTitle: ''}}/>
            <Stack.Screen name={"FocusedSketchScreen"} component={FocusedSketch} options={{headerTitle: ''}}/>
        </Stack.Navigator>
    ) 
}

const FriendsStack = () => {
    return (
        <Stack.Navigator initialRouteName={"FriendsScreen"} screenOptions={screenOptions()}>
            <Stack.Screen name={"FriendsScreen"} component={Friends} options={{headerTitle: 'Friends'}} />
        </Stack.Navigator>
    )
}

const SignUpAndInStack = () => {
    return (
        <Stack.Navigator initialRouteName="SignIn" 
                         screenOptions={{headerTitle: 'doolee', headerTransparent: true, headerTintColor: 'white', headerTitleStyle: {fontSize: 28}}}>
            <Stack.Screen name="SignIn" component={SignIn} options={{headerLeft: null}}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{headerLeft: null}}/>
        </Stack.Navigator>
    )
}

export function TabNavigator() {
    return (
        <Tab.Navigator initialRouteName={"Home"} screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if (route.name === "Home") iconName = focused ? 'home' : 'home-outline'
                else if (route.name === "MyProfile") iconName = focused ? 'person' : 'person-outline'
                else if (route.name === "Friends") iconName = focused ? 'people' : 'people-outline'
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
            <Tab.Screen name={"Home"} component={HomeStack}/>
            <Tab.Screen name={"MyProfile"} component={MyProfileStack}/>
            <Tab.Screen name={"Friends"} component={FriendsStack}/>
        </Tab.Navigator>
     )
  }

export default function App() { 
    const snap = useSnapshot(state);
    return (
        <>
        {(snap.uid != '') ?  
            <NavigationContainer theme={{colors: {background: 'black'}}}>
                <TabNavigator />
            </NavigationContainer>
        :           
            <NavigationContainer theme={{colors: {background: 'black'}}}>
                <SignUpAndInStack />
            </NavigationContainer>
        }
        </>
    )
}
