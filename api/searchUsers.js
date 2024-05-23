import { getAuth } from "firebase/auth";
import {app} from '../firebaseconfig'

export async function searchUsers(query) {
    try {
        const auth = getAuth(app);
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/searchUsers";
        const url = `${endpoint}?query=${query}&uid=${auth.currentUser.uid}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error searching users.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}