import { state } from '../state';
import { getAuth } from "firebase/auth";
import {app} from '../firebaseconfig';

export async function getFriendSketches() {
    try {
        const auth = getAuth(app);
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/getFriendSketches";
        const url = `${endpoint}?uid=${auth.currentUser.uid}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Could not fetch friends sketches.");
        }
        const friendSketches = await response.json();
        state.friendSketches = friendSketches;
    } catch (error) {
        throw error;
    }
}