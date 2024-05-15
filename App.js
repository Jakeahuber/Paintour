import 'react-native-gesture-handler';
import React, {useState} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import FindFriends from './components/FindFriends'
import EditProfile from './components/EditProfile'
import FocusedSketch from './components/FocusedSketch'
import Canvas from './components/Canvas'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import MyFriends from './components/MyFriends'
import {getUser} from './getUser';
import { state } from './state';
import { useSnapshot } from 'valtio';
import {TouchableOpacity, View, Text } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {getFriendSketches} from "./getFriendSketches";
import {app} from './firebaseconfig'
import Requests from './components/Requests';
import IconBadge from 'react-native-icon-badge';
import { getRequests } from './api/getRequests';
import LoadingModal from './components/LoadingModal';

const auth = getAuth(app);

onAuthStateChanged(auth, async user => {
  if (user) {
    const userData = await getUser(user.uid);
    state.uid = userData.uid;
    state.username = userData.username;
    state.profilePicture = userData.profilePicture;
    state.numSketches = userData.numSketches;
    state.numFriends = userData.numFriends;
    state.uploadedToday = userData.uploadedToday;
    state.numRequests = userData.numRequests;
    state.prompt = "A penguin trying to master the art of skateboarding on an icy slope.";
    await getFriendSketches(user.uid);
  } else {
    resetUser();
  }
});

const resetUser = () => {
    state.uid = "",
    state.username = "DNE",
    state.profilePicture = "https://firebasestorage.googleapis.com/v0/b/sketch-c3044.appspot.com/o/profilePictures%2Fdefaultprofile.png?alt=media&token=b825b2a3-dd2e-400b-ae60-31858a4ce864",
    state.streak = 0,
    state.numSketches = 0,
    state.numFriends = 0
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
    const snap = useSnapshot(state);
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <Stack.Navigator initialRouteName={"MyProfileScreen"} screenOptions={screenOptions()}>
            <Stack.Screen   name={'MyProfileScreen'} 
                            component={MyProfile}
                            options={({ navigation }) => ({
                                headerTitle: state.username,
                                headerRight: () => (
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity
                                        style={{ marginRight: 10}}
                                        onPress={async () => {
                                            setModalVisible(true);
                                            try {
                                                const requests = await getRequests();
                                                state.requests = requests; 
                                                navigation.navigate('Requests');
                                            }
                                            catch {
                                                console.error("Could not get requests.")
                                            }
                                            setModalVisible(false);
                                        }}
                                        >
                                        <IconBadge
                                            MainElement={
                                                <Ionicons name="notifications" size={30} color="white" />                                           
                                            }
                                            BadgeElement={
                                                <Text style={{color: 'white'}}>{snap.numRequests}</Text>
                                            }
                                        />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ marginRight: 10 }}
                                            onPress={() => navigation.navigate('EditProfileScreen')}
                                        >
                                            <Ionicons name="ellipsis-horizontal" size={30} color="white" />
                                        </TouchableOpacity>
                                        <LoadingModal visible={modalVisible} />
                                    </View>
                                ),
                            })}
            />
            <Stack.Screen name={"EditProfileScreen"} component={EditProfile} options={{headerTitle: snap.username, headerTitleAlign: 'center'}}/>
            <Stack.Screen name={"Requests"} component={Requests} options={{headerTitle: 'Requests', headerTitleAlign: 'center'}} />
            <Stack.Screen name={"FocusedSketchScreen"} component={FocusedSketch} options={{headerTitle: ''}}/>
            <Stack.Screen name={"MyFriends"} component={MyFriends} options={{headerTitle: 'My Friends', headerTitleAlign: 'center'}}/>
            <Stack.Screen name={"Profile"} component={Profile} options={{headerTitle: ''}}/>
        </Stack.Navigator>
    ) 
}

const FriendsStack = () => {
    return (
        <Stack.Navigator initialRouteName={"FriendsScreen"} screenOptions={screenOptions()}>
            <Stack.Screen name={"FriendsScreen"} component={FindFriends} options={{headerTitle: 'Find Friends'}} />
            <Stack.Screen name={"Profile"} component={Profile} options={{headerTitle: ''}}/>
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
