import { getAuth } from "firebase/auth";
import {app} from '../firebaseconfig'

export async function getSketchesByYear(year) {
    try {
        const auth = getAuth(app);
        const url = `https://us-central1-sketch-c3044.cloudfunctions.net/app/getUserSketchesByYear?year=${year}`;
        const token = await auth.currentUser.getIdToken();
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }); 
        if (!response.ok) {
            throw new Error("Error getting user sketches.");
        }
        const sketchesByYear = await response.json();
        return sketchesByYear; 

    } catch (error) {
        throw error;
    }
};