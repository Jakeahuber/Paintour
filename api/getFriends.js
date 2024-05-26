import { getAuth } from "firebase/auth";
import {app} from '../firebaseconfig'

export async function getFriends() {
    try {
        const auth = getAuth(app);
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/app/getFriends";
        const url = `${endpoint}`;
        const token = await auth.currentUser.getIdToken();
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }); 
        if (!response.ok) {
            throw new Error("Error fetching user data.");
        }
        const friends = await response.json();
        return friends; 

    } catch (error) {
        throw error;
    }
};