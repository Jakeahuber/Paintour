import { getAuth } from "firebase/auth";
import {app} from '../firebaseconfig'

export async function createUser(username) {
    try {
        const auth = getAuth(app);
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/app/createUser";
        const url = `${endpoint}?username=${username}`;
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
                throw new Error("Error creating user.");
            }
        }
        return; 
    } catch (error) {
        throw error;
    }
};