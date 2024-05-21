export async function getSketchesByYear(uid, year) {
    try {
        const url = `https://us-central1-sketch-c3044.cloudfunctions.net/getUserSketchesByYear?uid=${uid}&year=${year}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error getting user sketches.");
        }
        const sketchesByYear = await response.json();
        return sketchesByYear; 

    } catch (error) {
        throw error;
    }
};