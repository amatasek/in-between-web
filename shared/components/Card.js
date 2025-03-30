import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Card({ value, suit }) {
  const color = suit === '♥' || suit === '♦' ? '#ff0000' : '#000000';
  
  return (
    <View style={styles.card}>
      <Text style={[styles.cardText, { color }]}>
        {value}{suit}
      </Text>
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
});
