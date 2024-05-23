import { updateMyData } from "./updateMyData";
import { getAuth } from "firebase/auth";
import {app} from '../firebaseconfig'

async function uploadProfilePicture(base64) {
  try {
    const auth = getAuth(app);
    const url = `https://us-central1-sketch-c3044.cloudfunctions.net/uploadProfilePicture?uid=${auth.currentUser.uid}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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