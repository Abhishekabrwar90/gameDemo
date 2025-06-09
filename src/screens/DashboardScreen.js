import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useApp } from '../context/AppContext';
import GameCard from '../components/GameCard';

const STATUS_FILTERS = [
  { label: 'Upcoming', value: 'scheduled' },
  { label: 'Live', value: 'inProgress' },
  { label: 'Completed', value: 'final' },
];

export default function DashboardScreen({ navigation }) {
  const { games, loading, error, fetchGames } = useApp();
  const [filter, setFilter] = useState('scheduled');

  const filteredGames = games.filter(g => {
    if (filter === 'scheduled') return g.status === 'scheduled';
    if (filter === 'inProgress') return g.status === 'inProgress';
    if (filter === 'final') return g.status === 'final';
    return true;
  });

  const renderGame = ({ item }) => (
    <GameCard
      game={item}
      onPress={() => navigation.navigate('GameDetail', { gameId: item.id })}
    />
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading games...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity onPress={fetchGames} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        {STATUS_FILTERS.map(f => (
          <TouchableOpacity
            key={f.value}
            style={[styles.filterBtn, filter === f.value && styles.activeFilter]}
            onPress={() => setFilter(f.value)}
          >
            <Text style={filter === f.value ? styles.activeFilterText : styles.filterText}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredGames}
        keyExtractor={item => item.id}
        renderItem={renderGame}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  filterRow: { flexDirection: 'row', marginBottom: 12, justifyContent: 'space-around' },
  filterBtn: { padding: 8, borderRadius: 6, backgroundColor: '#eee' },
  activeFilter: { backgroundColor: '#007bff' },
  filterText: { color: '#333' },
  activeFilterText: { color: '#fff', fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', fontSize: 16, marginBottom: 10 },
  retryButton: { backgroundColor: '#007bff', padding: 10, borderRadius: 5 },
  retryButtonText: { color: 'white', fontWeight: 'bold' },
}); 