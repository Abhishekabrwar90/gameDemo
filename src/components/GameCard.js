import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function GameCard({ game, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.teams}>{game.homeTeam.abbreviation} vs {game.awayTeam.abbreviation}</Text>
      <Text>Status: {game.status}</Text>
      {game.odds && (
        <Text>Odds: {game.odds.favorite} {game.odds.spread}</Text>
      )}
      {game.status === 'inProgress' && (
        <Text>{game.period} - {game.clock}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, marginBottom: 12, backgroundColor: '#f9f9f9', borderRadius: 8, elevation: 2 },
  teams: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
}); 