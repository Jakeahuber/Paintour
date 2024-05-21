import { state } from '../state';

export async function getUser(uid) {
    try {
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/getUser";
        const url = `${endpoint}?uid=${uid}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error fetching user data.");
        }
        const userData = await response.json();
        return userData; 

    } catch (error) {
        throw error;
    }
};