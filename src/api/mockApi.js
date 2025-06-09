// const sampleData = require('../../sample-games-simplified.json');
// const AsyncStorage = require('@react-native-async-storage/async-storage');

const API_URL = 'http://localhost:4000';

// let games = sampleData.games;
// let user = { ...sampleData.user };

// const USER_STORAGE_KEY = 'user_data';

// async function loadUserFromStorage() {
//   try {
//     const stored = await AsyncStorage.getItem(USER_STORAGE_KEY);
//     if (stored) {
//       user = JSON.parse(stored);
//     }
//   } catch (e) {
//     // ignore
//   }
// }

// async function saveUserToStorage() {
//   try {
//     await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
//   } catch (e) {
//     // ignore
//   }
// }

// // Load user data from storage on module load
// loadUserFromStorage();

export async function getGames() {
  try {
    const response = await fetch(`${API_URL}/games`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error; // Re-throw to be caught by the component
  }
}

export async function getUser() {
   try {
    const response = await fetch(`${API_URL}/user`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; // Re-throw to be caught by the component
  }
}

export async function submitPrediction(gameId, pick, amount) {
   try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameId, pick, amount }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || 'Failed to submit prediction');
    }
  } catch (error) {
    console.error('Error submitting prediction:', error);
    throw error; // Re-throw to be caught by the component
  }
} 