import { updateMyData } from "./updateMyData";
import { getAuth } from "firebase/auth";
import {app} from '../firebaseconfig'

async function uploadProfilePicture(base64) {
  try {
    const auth = getAuth(app);
    const url = `https://us-central1-sketch-c3044.cloudfunctions.net/app/uploadProfilePicture`;
    const token = await auth.currentUser.getIdToken();
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({"image": base64})
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const userData = await response.json();
    updateMyData(userData);
  } catch (error) {
    throw error;
  }
}

export default uploadProfilePicture;