import { getAuth } from "firebase/auth";
import {app} from '../firebaseconfig'

export async function getUser(uid) {
    try {
        const auth = getAuth(app);
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/getUser";
        const url = `${endpoint}?requestingUid=${uid}&uid=${auth.currentUser.uid}`;
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