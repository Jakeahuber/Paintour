import { state } from './state';

export async function getUserSketches(uid, month ,year) {
  console.log("F");
  try {
    const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/getUserSketchesByDate";
    const url = `${endpoint}?uid=${uid}&month=${month}&year=${year}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error fetching user data.");
    }
    const userData = await response.json();
    console.log("DONE");
    return userData; 

  } catch (error) {
      console.error("Error fetching user data.");
  }
};
