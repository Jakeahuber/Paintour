import { state } from './state';

export async function getFriendSketches(uid) {
    try {
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/getFriendSketches";
        const url = `${endpoint}?uid=${uid}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error fetching user data.");
        }
        const friendSketches = await response.json();
        state.friendSketches = friendSketches;
    } catch (error) {
        console.error("Error fetching user data.");
    }
}