import { state } from '../state';

export async function getRequests() {
    try {
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/getRequests";
        const url = `${endpoint}?uid=${state.uid}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error fetching user data.");
        }
        const requests = await response.json();
        return requests; 

    } catch (error) {
        throw error;
    }
};