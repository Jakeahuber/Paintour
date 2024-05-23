import { getAuth } from "firebase/auth";
import {app} from '../firebaseconfig'

export async function reportUser(uid) {
    try {
        const auth = getAuth(app);
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/reportUser";
        const url = `${endpoint}?uid=${uid}&reportingUid=${auth.currentUser.uid}`;
        const response = await fetch(url);
        if (!response.ok) {
            console.log("errro");
            throw new Error("Error reporting user.");
        }
        return; 
    } catch (error) {
        throw error;
    }
};