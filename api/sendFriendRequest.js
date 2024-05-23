import { getAuth } from "firebase/auth";
import {app} from '../firebaseconfig'

export async function sendFriendRequest(requestedUid) {
    try {
        const auth = getAuth(app);
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/sendFriendRequest";
        const url = `${endpoint}?uid=${auth.currentUser.uid}&requestedUid=${requestedUid}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error fetching user data.");
        }
        return; 
    } catch (error) {
        throw error;
    }
};