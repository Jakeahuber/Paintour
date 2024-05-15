import { useNavigation } from "@react-navigation/native";
import { state } from "../state";


async function uploadProfilePicture(canvasRef) {
    const url = `https://us-central1-sketch-c3044.cloudfunctions.net/uploadProfilePicture?uid=${state.uid}`;
    const image = canvasRef.current?.toBase64(0, 0.5);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"image": image})
    })
    .then(async response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
    .then(userData => {
        state.uid = userData.uid;
        state.username = userData.username;
        state.profilePicture = userData.profilePicture;
        state.numSketches = userData.numSketches;
        state.numFriends = userData.numFriends;
        state.uploadedToday = userData.uploadedToday;
        state.numRequests = userData.numRequests;
        state.prompt = "A penguin trying to master the art of skateboarding on an icy slope.";
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
  };

  export default uploadProfilePicture;