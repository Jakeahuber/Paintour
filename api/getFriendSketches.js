import { state } from '../state';
import { getAuth } from "firebase/auth";
import {app} from '../firebaseconfig';

export async function getFriendSketches() {
    try {
        const auth = getAuth(app);
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/app/getFriendSketches";
        const url = `${endpoint}`;
        const token = await auth.currentUser.getIdToken();
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }); 
        if (!response.ok) {
            throw new Error("Could not fetch friends sketches.");
        }
        const friendSketches = await response.json();
        state.friendSketches = friendSketches;
    } catch (error) {
        throw error;
    }
}