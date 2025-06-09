import React, { createContext, useContext, useState, useEffect } from 'react';
import { getGames, getUser, submitPrediction as apiSubmitPrediction } from '../api/mockApi';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const fetchedGames = await getGames();
      setGames(fetchedGames);
      setError(null);
    } catch (e) {
      console.error('Failed to fetch games:', e);
      setError('Failed to load games.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
      setError(null);
    } catch (e) {
      console.error('Failed to fetch user:', e);
      setError('Failed to load user data.');
    } finally {
      setLoading(false);
    }
  };

  const submitPrediction = async (gameId, pick, amount) => {
    try {
      const result = await apiSubmitPrediction(gameId, pick, amount);
      // After submitting, re-fetch user data to update balance and predictions
      await fetchUser();
      return result;
    } catch (e) {
      console.error('Failed to submit prediction:', e);
      setError(e.message);
      throw e; // Re-throw so components can catch it
    }
  };

  useEffect(() => {
    fetchGames();
    fetchUser();
    // Implement polling for games and user data (e.g., every 10 seconds)
    const gameInterval = setInterval(fetchGames, 10000);
    const userInterval = setInterval(fetchUser, 10000);

    return () => {
      clearInterval(gameInterval);
      clearInterval(userInterval);
    };
  }, []);

  const contextValue = {
    games,
    user,
    loading,
    error,
    fetchGames,
    fetchUser,
    submitPrediction,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 