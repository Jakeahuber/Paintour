import { state } from './state';

export async function searchUsers(query) {

    try {
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/searchUsers";
        const url = `${endpoint}?query=${query}&uid=${state.uid}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error searching users.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user data.");
    }
}