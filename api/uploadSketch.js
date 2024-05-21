import { getUser } from "./getUser";
import { state } from "../state";

async function uploadSketch(base64) {
    const url = `https://us-central1-sketch-c3044.cloudfunctions.net/uploadSketch?uid=${state.uid}`;
    const sketchData = {
      uid: state.uid,
      username: state.username,
      profilePicture: state.profilePicture,
      image: base64
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sketchData)
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok');
      }

      const userData = await getUser(state.uid); 
      state.numSketches = userData.numSketches;
      state.uploadedToday = userData.uploadedToday;
      state.forceUserSketchesUpdate = !state.forceUserSketchesUpdate;
    } catch (error) {
      throw error;
    }
  };

export default uploadSketch;