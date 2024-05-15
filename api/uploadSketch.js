import { getUser } from "../getUser";
import { state } from "../state";

async function uploadSketch(canvasRef) {
    const url = "https://us-central1-sketch-c3044.cloudfunctions.net/uploadSketch";
    const image = canvasRef.current?.toBase64(0, 0.5);
    const sketchData = {
      uid: state.uid,
      username: state.username,
      profilePicture: state.profilePicture,
      image: image
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sketchData)
    })
    .then(async response => {
      if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok');
      }
      const userData = await getUser(state.uid); 
      state.numSketches = userData.numSketches;
      state.uploadedToday = userData.uploadedToday;
      state.forceUserSketchesUpdate = !state.forceUserSketchesUpdate;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

export default uploadSketch;