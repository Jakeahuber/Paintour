import { getUser } from "./getUser";
import { state } from "../state";
import { getAuth } from "firebase/auth";
import {app} from '../firebaseconfig'

async function uploadSketch(base64) {
    try {
      const auth = getAuth(app);
      const url = `https://us-central1-sketch-c3044.cloudfunctions.net/app/uploadSketch`;
      const sketchData = {
        image: base64
      }
      const token = await auth.currentUser.getIdToken();
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(sketchData)
      });
      console.log(await response.text());
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const userData = await getUser(auth.currentUser.uid); 
      state.numSketches = userData.numSketches;
      state.uploadedToday = userData.uploadedToday;
      state.forceUserSketchesUpdate = !state.forceUserSketchesUpdate;
    } catch (error) {
      throw error;
    }
  };

export default uploadSketch;