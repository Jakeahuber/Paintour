import { state } from '../state';
import { getAuth } from "firebase/auth";
import {app} from '../firebaseconfig'

export async function handleFriendRequest(requestedUid, accepting) {
    try {
        const auth = getAuth(app);
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/app/handleFriendRequest";
        const url = `${endpoint}?requestedUid=${requestedUid}&accepting=${accepting}`;
        const token = await auth.currentUser.getIdToken();
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }); 
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