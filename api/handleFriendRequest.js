import { state } from '../state';
import { getAuth } from "firebase/auth";
import {app} from '../firebaseconfig'

export async function handleFriendRequest(requestedUid, accepting) {
    try {
        const auth = getAuth(app);
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/handleFriendRequest";
        const url = `${endpoint}?uid=${auth.currentUser.uid}&requestedUid=${requestedUid}&accepting=${accepting}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error fetching user data.");
        }
        const updatedUser = await response.json();
        state.numFriends = updatedUser.numFriends;
        state.numRequests = updatedUser.numRequests;
        state.requests = state.requests.filter(request => request.uid !== requestedUid);
        return; 

    } catch (error) {
        throw error;
    }
};