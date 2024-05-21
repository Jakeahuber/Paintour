import { state } from '../state';

export async function updateMyData(userData) {
    state.uid = userData.uid;
    state.username = userData.username;
    state.profilePicture = userData.profilePicture;
    state.numSketches = userData.numSketches;
    state.numFriends = userData.numFriends;
    state.uploadedToday = userData.uploadedToday;
    state.numRequests = userData.numRequests;
    state.prompt = userData.prompt;
};