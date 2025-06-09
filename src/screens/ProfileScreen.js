import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useApp } from '../context/AppContext';

export default function ProfileScreen() {
  const { user, loading, error, fetchUser } = useApp();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity onPress={fetchUser} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!user) return <View style={styles.center}><Text>No user data available.</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.username}'s Profile</Text>
      <Text>Balance: ${user.balance.toFixed(2)}</Text>
      <Text>Record: {user.stats.wins}W - {user.stats.losses}L - {user.stats.pending} Pending</Text>
      <Text style={styles.subtitle}>Prediction History:</Text>
      <FlatList
        data={user.predictions}
        keyExtractor={item => item.gameId}
        renderItem={({ item }) => (
          <View style={styles.predictionCard}>
            <Text>Game: {item.gameId}</Text>
            <Text>Pick: {item.pick}</Text>
            <Text>Amount: ${item.amount}</Text>
            <Text>Result: {item.result}</Text>
            {item.payout !== undefined && <Text>Payout: ${item.payout.toFixed(2)}</Text>}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { marginTop: 16, fontWeight: 'bold' },
  predictionCard: { padding: 12, marginVertical: 6, backgroundColor: '#f1f1f1', borderRadius: 8 },
  errorText: { color: 'red', fontSize: 16, marginBottom: 10 },
  retryButton: { backgroundColor: '#007bff', padding: 10, borderRadius: 5 },
  retryButtonText: { color: 'white', fontWeight: 'bold' },
}); 