import { state } from '../state';

export async function getFriends() {
    try {
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/getFriends";
        const url = `${endpoint}?uid=${state.uid}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error fetching user data.");
        }
        const friends = await response.json();
        return friends; 

    } catch (error) {
        console.error("Error fetching friends.");
        throw error;
    }
};