import React, {useState, useEffect} from "react";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
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
import Profile from './components/Profile'
import MyFriends from './components/MyFriends'
import {getUser} from './api/getUser';
import { state } from './state';
import { useSnapshot } from 'valtio';
import {TouchableOpacity, View, Text } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {getFriendSketches} from "./api/getFriendSketches";
import {app} from './firebaseconfig'
import Requests from './components/Requests';
import IconBadge from 'react-native-icon-badge';
import { getRequests } from './api/getRequests';
import LoadingModal from './components/LoadingModal';
import ErrorModal from './components/ErrorModal';
import { updateMyData } from './api/updateMyData';
import { reportUser } from "./api/reportUser";
import InfoModal from "./components/InfoModal";
import SignUp from "./components/SignUp";

const resetUser = () => {
    state.username = "DNE",
    state.profilePicture = "https://firebasestorage.googleapis.com/v0/b/sketch-c3044.appspot.com/o/profilePictures%2Fdefaultprofile.jpg?alt=media&token=d45553bf-65c6-408b-a444-5ede28acc7fb",
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
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);
    const closeModal = () => {
        setErrorVisible(false);
    };
    const [infoVisible, setInfoVisible] = useState(false);

    const ReportUserHeader = () => {
        return (
            <View>
            <TouchableOpacity
            style={{ marginRight: 20}}
            onPress={async () => {
                setModalVisible(true);
                try {
                    await reportUser(state.currentProfileUid);
                    setTimeout(() => {
                        setInfoVisible(true);
                      }, 300);  
                }
                catch {
                    setMessage("Could not report user. Please try again later.");
                    setTimeout(() => {
                        setErrorVisible(true);
                      }, 300);      
                }
                setModalVisible(false);
            }}
            >
                <Text style={{color: 'white', fontSize: 18}}>Report</Text>
            </TouchableOpacity>
            <LoadingModal visible={modalVisible} />
            <ErrorModal visible={errorVisible} message={message} onClose={closeModal} />
            <InfoModal visible={infoVisible} message={"Reported User."} onClose={() => {setInfoVisible(false)}}/>
            </View>
        )
    }

    return (
        <Stack.Navigator initialRouteName={"HomeScreen"} screenOptions={screenOptions()}>
            <Stack.Screen name={"HomeScreen"} component={Home} options={{headerTitle: 'Paintr'}}/>
            <Stack.Screen name={"Canvas"} component={Canvas} options={{headerTitle: '', gestureEnabled: false}}/>
            <Stack.Screen name={"Profile"} component={Profile} options={{headerTitle: '', headerRight: ReportUserHeader}}/>
            <Stack.Screen name={"FocusedSketchScreen"} component={FocusedSketch} options={{headerTitle: ''}}/>
        </Stack.Navigator>
    )
}

const MyProfileStack = () => {
    const snap = useSnapshot(state);
    const [modalVisible, setModalVisible] = useState(false);

    const [message, setMessage] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);
    const closeModal = () => {
        setErrorVisible(false);
    };
    const [infoVisible, setInfoVisible] = useState(false);

    const ReportUserHeader = () => {
        return (
            <View>
            <TouchableOpacity
            style={{ marginRight: 20}}
            onPress={async () => {
                setModalVisible(true);
                try {
                    await reportUser(state.currentProfileUid);
                    setTimeout(() => {
                        setInfoVisible(true);
                      }, 300);  
                }
                catch {
                    setMessage("Could not report user. Please try again later.");
                    setTimeout(() => {
                        setErrorVisible(true);
                      }, 300);      
                }
                setModalVisible(false);
            }}
            >
                <Text style={{color: 'white', fontSize: 18}}>Report</Text>
            </TouchableOpacity>
            <LoadingModal visible={modalVisible} />
            <ErrorModal visible={errorVisible} message={message} onClose={closeModal} />
            <InfoModal visible={infoVisible} message={"Reported User."} onClose={() => {setInfoVisible(false)}}/>
            </View>
        )
    }

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
                                                setMessage("Could not load requests. Please try again later.");
                                                setTimeout(() => {
                                                    setErrorVisible(true);
                                                  }, 300); 
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
                                        <ErrorModal visible={errorVisible} message={message} onClose={closeModal} />
                                    </View>
                                ),
                            })}
            />
            <Stack.Screen name={"EditProfileScreen"} component={EditProfile} options={{headerTitle: snap.username, headerTitleAlign: 'center'}}/>
            <Stack.Screen name={"Requests"} component={Requests} options={{headerTitle: 'Requests', headerTitleAlign: 'center'}} />
            <Stack.Screen name={"FocusedSketchScreen"} component={FocusedSketch} options={{headerTitle: ''}}/>
            <Stack.Screen name={"MyFriends"} component={MyFriends} options={{headerTitle: 'My Friends', headerTitleAlign: 'center'}}/>
            <Stack.Screen name={"Profile"} component={Profile} options={{headerTitle: '', headerRight: ReportUserHeader}}/>
            <Stack.Screen name={"DrawProfilePic"} component={Canvas}  options={{gestureEnabled: false, headerTitle: 'Draw Profile Picture', headerTitleAlign: 'center',
                                                                                        headerTitleStyle: {fontSize: 22}}}/>
        </Stack.Navigator>
    ) 
}

const FriendsStack = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);
    const closeModal = () => {
        setErrorVisible(false);
    };
    const [infoVisible, setInfoVisible] = useState(false);

    const ReportUserHeader = () => {
        return (
            <View>
            <TouchableOpacity
            style={{ marginRight: 20}}
            onPress={async () => {
                setModalVisible(true);
                try {
                    await reportUser(state.currentProfileUid);
                    setTimeout(() => {
                        setInfoVisible(true);
                      }, 300);  
                }
                catch {
                    setMessage("Could not report user. Please try again later.");
                    setTimeout(() => {
                        setErrorVisible(true);
                      }, 300);      
                }
                setModalVisible(false);
            }}
            >
                <Text style={{color: 'white', fontSize: 18}}>Report</Text>
            </TouchableOpacity>
            <LoadingModal visible={modalVisible} />
            <ErrorModal visible={errorVisible} message={message} onClose={closeModal} />
            <InfoModal visible={infoVisible} message={"Reported User."} onClose={() => {setInfoVisible(false)}}/>
            </View>
        )
    }

    return (
        <Stack.Navigator initialRouteName={"FriendsScreen"} screenOptions={screenOptions()}>
            <Stack.Screen name={"FriendsScreen"} component={FindFriends} options={{headerTitle: 'Find Friends'}} />
            <Stack.Screen name={"Profile"} component={Profile} options={{headerTitle: '', headerRight: ReportUserHeader}}/>
        </Stack.Navigator>
    )
}

const SignUpAndInStack = () => {
    return (
        <Stack.Navigator initialRouteName={"SignIn"} 
                            screenOptions={{headerTitle: 'Paintr', headerTransparent: true, headerTintColor: 'white', headerTitleStyle: {fontSize: 28}}}>
            <Stack.Screen name={"SignIn"} component={SignIn} options={{headerLeft: null}}/>
            <Stack.Screen name={"SignUp"} component={SignUp} options={{headerLeft: null}}/>
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
    const auth = getAuth(app);
    const [message, setMessage] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);
    const [signedIn, setSignedIn] = useState(false);
    const snap = useSnapshot(state);

    const closeModal = () => {
        setErrorVisible(false);
    };

    useEffect(() => {
        const signIn = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userData = await getUser(user.uid);
                    updateMyData(userData);
                    await getFriendSketches(user.uid);
                    setSignedIn(true);
                } catch (error) {
                    const userNotCreatedMsg = "A User with this UID does not exist.";
                    if (error.message === userNotCreatedMsg) {
                        // the user does not exist. Do nothing, as signIn should handle this.
                        return;
                    }
                    else {
                        setMessage("Could not fetch user data. Please try again later.");
                        setErrorVisible(true);
                    }
                }
            } else {
                resetUser();
                setSignedIn(false);
            }
        });
        return () => signIn();
    }, [auth, snap.forceUserReload]);

    return (
        <>
            <NavigationContainer theme={{ colors: { background: 'black' } }}>
                {signedIn ? <TabNavigator /> : <SignUpAndInStack />}
            </NavigationContainer>
            <ErrorModal visible={errorVisible} message={message} onClose={closeModal} />
        </>
    );
}
