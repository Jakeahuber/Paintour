import { getAuth } from "firebase/auth";
import {app} from '../firebaseconfig'

export async function sendFriendRequest(requestedUid) {
    try {
        const auth = getAuth(app);
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/app/sendFriendRequest";
        const url = `${endpoint}?requestedUid=${requestedUid}`;
        const token = await auth.currentUser.getIdToken();
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }); 
        if (!response.ok) {
            throw new Error("Error fetching user data.");
        }
        return; 
    } catch (error) {
        throw error;
    }
};