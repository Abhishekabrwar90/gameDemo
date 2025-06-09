import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';

export default function PredictionForm({ game, onSubmit, submitting }) {
  const [pick, setPick] = useState(null);
  const [amount, setAmount] = useState(50);

  return (
    <View>
      <View style={styles.teamsRow}>
        <TouchableOpacity
          style={[styles.teamBtn, pick === game.homeTeam.abbreviation && styles.selectedTeam]}
          onPress={() => setPick(game.homeTeam.abbreviation)}
        >
          <Text>{game.homeTeam.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.teamBtn, pick === game.awayTeam.abbreviation && styles.selectedTeam]}
          onPress={() => setPick(game.awayTeam.abbreviation)}
        >
          <Text>{game.awayTeam.name}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.amountRow}>
        <Text>Amount: </Text>
        <TouchableOpacity onPress={() => setAmount(Math.max(10, amount - 10))}><Text style={styles.amountBtn}>-</Text></TouchableOpacity>
        <Text style={styles.amountText}>{amount}</Text>
        <TouchableOpacity onPress={() => setAmount(amount + 10)}><Text style={styles.amountBtn}>+</Text></TouchableOpacity>
      </View>
      <Button
        title={submitting ? 'Submitting...' : 'Submit Prediction'}
        onPress={() => onSubmit(pick, amount)}
        disabled={submitting || !pick}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  teamsRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16 },
  teamBtn: { padding: 12, borderRadius: 8, backgroundColor: '#eee', minWidth: 100, alignItems: 'center' },
  selectedTeam: { backgroundColor: '#007bff' },
  amountRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 16, justifyContent: 'center' },
  amountBtn: { fontSize: 20, marginHorizontal: 12, color: '#007bff' },
  amountText: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 8 },
}); 