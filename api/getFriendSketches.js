import { state } from '../state';

export async function getFriendSketches(uid) {
    try {
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/getFriendSketches";
        const url = `${endpoint}?uid=${uid}`;
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