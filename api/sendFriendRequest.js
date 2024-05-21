import { state } from '../state';

export async function sendFriendRequest(requestedUid) {
    try {
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/sendFriendRequest";
        const url = `${endpoint}?uid=${state.uid}&requestedUid=${requestedUid}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error fetching user data.");
        }
        return; 
    } catch (error) {
        throw error;
    }
};