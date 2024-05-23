import { getUser } from "./getUser";
import { state } from "../state";
import { getAuth } from "firebase/auth";
import {app} from '../firebaseconfig'

async function uploadSketch(base64) {
    try {
      const auth = getAuth(app);
      const url = `https://us-central1-sketch-c3044.cloudfunctions.net/uploadSketch?uid=${auth.currentUser.uid}`;
      const sketchData = {
        uid: auth.currentUser.uid,
        username: state.username,
        profilePicture: state.profilePicture,
        image: base64
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sketchData)
      });

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