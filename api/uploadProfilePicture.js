import { state } from "../state";
import { updateMyData } from "./updateMyData";

async function uploadProfilePicture(base64) {
  const url = `https://us-central1-sketch-c3044.cloudfunctions.net/uploadProfilePicture?uid=${state.uid}`;
  try {
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