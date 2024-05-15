import { state } from '../state';

export async function handleFriendRequest(requestedUid, accepting) {
    try {
        const endpoint = "https://us-central1-sketch-c3044.cloudfunctions.net/handleFriendRequest";
        const url = `${endpoint}?uid=${state.uid}&requestedUid=${requestedUid}&accepting=${accepting}`;
        const response = await fetch(url);
        if (!response.ok) {
            console.log(response);
            throw new Error("Error fetching user data.");
        }
        const updatedUser = await response.json();
        state.numFriends = updatedUser.numFriends;
        state.numRequests = updatedUser.numRequests;
        state.requests = state.requests.filter(request => request.uid !== requestedUid);
        return; 

    } catch (error) {
        console.error("Error handling friend request.");
        throw error;
    }
};