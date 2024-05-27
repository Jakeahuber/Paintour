import { getAuth } from "firebase/auth";
import {app} from '../firebaseconfig'

export async function reportUser(uid) {
    try {
        const auth = getAuth(app);
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/app/reportUser";
        const url = `${endpoint}?toReport=${uid}`;
        const token = await auth.currentUser.getIdToken();
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }); 
        if (!response.ok) {
            throw new Error("Error reporting user.");
        }
        return; 
    } catch (error) {
        throw error;
    }
};