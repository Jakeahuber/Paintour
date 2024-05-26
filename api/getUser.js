import { getAuth } from "firebase/auth";
import {app} from '../firebaseconfig'

export async function getUser(uid) {
    try {
        const auth = getAuth(app);
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/app/getUser";
        const url = `${endpoint}?requestingUid=${uid}`;
        const token = await auth.currentUser.getIdToken();
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }); 
        if (!response.ok) {
            if (response.status == 400) {
                const errorData = await response.text();
                throw new Error(errorData);
            }
            else {
                throw new Error("Could not create account. Please try again later.");
            }
        }
        const userData = await response.json();
        return userData; 

    } catch (error) {
        throw error;
    }
};