import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useApp } from '../context/AppContext';
import PredictionForm from '../components/PredictionForm';

export default function GameDetailScreen({ route, navigation }) {
  const { gameId } = route.params;
  const { games, submitPrediction, loading, error, fetchGames } = useApp();
  const [submitting, setSubmitting] = useState(false);

  const game = games.find(g => g.id === gameId);

  const handlePrediction = async (pick, amount) => {
    if (!pick) {
      Alert.alert('Select a team to predict!');
      return;
    }
    setSubmitting(true);
    try {
      await submitPrediction(gameId, pick, amount);
      Alert.alert('Prediction submitted!');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading game details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!game) return <View style={styles.center}><Text>Game not found.</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{game.homeTeam.name} vs {game.awayTeam.name}</Text>
      <Text>Status: {game.status}</Text>
      {game.odds && (
        <Text>Odds: {game.odds.favorite} {game.odds.spread}</Text>
      )}
      {game.status === 'scheduled' && (
        <PredictionForm game={game} onSubmit={handlePrediction} submitting={submitting} />
      )}
      {game.status !== 'scheduled' && (
        <Text style={styles.gameEndedText}>This game is {game.status}. Predictions are closed.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  errorText: { color: 'red', fontSize: 16 },
  gameEndedText: { fontSize: 16, fontStyle: 'italic', textAlign: 'center', marginTop: 20 },
}); 