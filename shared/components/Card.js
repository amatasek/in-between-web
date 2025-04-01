import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Card({ value, suit, isAceLow }) {
  const color = suit === '♥' || suit === '♦' ? '#ff0000' : '#000000';
  const showAceIndicator = value === 'A';
  
  return (
    <View style={styles.card}>
      <Text style={[styles.cardText, { color }]}>
        {value}{suit}
      </Text>
      {showAceIndicator && (
        <Text style={[styles.aceIndicator, { color }]}>
          {isAceLow ? 'LOW' : 'HIGH'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 5,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
    minWidth: 60,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  aceIndicator: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
