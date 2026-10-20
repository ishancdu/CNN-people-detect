import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AppContext } from '../AppContext';

export default function CalendarScreen() {
  const { entries } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calendar View</Text>
      <ScrollView>
        {entries.length === 0 ? (
          <Text style={styles.empty}>No entries yet.</Text>
        ) : (
          entries.map(entry => {
            const date = new Date(entry.startTime).toLocaleDateString();
            return (
              <View key={entry.id} style={[styles.block, { backgroundColor: entry.color || '#8B5CF6' }]}>
                <Text style={styles.blockText}>{entry.taskName}</Text>
                <Text style={styles.blockDate}>{date}</Text>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
  empty: { color: '#888', textAlign: 'center', marginTop: 32 },
  block: { padding: 16, borderRadius: 8, marginBottom: 8 },
  blockText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  blockDate: { color: '#000', fontSize: 12, marginTop: 4 },
});
