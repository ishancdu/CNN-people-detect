import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AppContext } from '../AppContext';
import { PlayCircle, StopCircle } from 'lucide-react-native';

const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export default function TimelineScreen({ navigation }) {
  const { entries, activeTask, stopTask } = useContext(AppContext);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let interval;
    if (activeTask) {
      interval = setInterval(() => {
        setElapsed((new Date() - new Date(activeTask.startTime)) / 1000);
      }, 1000);
    } else {
      setElapsed(0);
    }
    return () => clearInterval(interval);
  }, [activeTask]);

  return (
    <View style={styles.container}>
      {activeTask && (
        <View style={[styles.activeTimer, { backgroundColor: activeTask.color || '#FACC15' }]}>
          <View style={styles.timerHeader}>
            <Text style={styles.activeTitle}>{activeTask.taskName}</Text>
            <Text style={styles.timerText}>{formatTime(elapsed)}</Text>
          </View>
          <Text style={styles.activeProjectName}>{activeTask.projectName}</Text>
          <TouchableOpacity style={styles.stopButton} onPress={stopTask}>
            <Text style={styles.stopButtonText}>STOP</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.entriesList}>
        <Text style={styles.sectionTitle}>Recent Entries</Text>
        {entries.slice().reverse().map(entry => (
          <View key={entry.id} style={styles.entryItem}>
            <View style={styles.entryInfo}>
              <View style={[styles.dot, { backgroundColor: entry.color || '#8B5CF6' }]} />
              <Text style={styles.entryName}>{entry.taskName || 'Unnamed task'}</Text>
            </View>
            <View style={styles.entryRight}>
              <Text style={styles.entryDuration}>{formatTime(entry.duration)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('Projects')}
        >
          <Text style={styles.fabText}>Projects</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  activeTimer: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  timerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  activeTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  timerText: { fontSize: 32, fontWeight: 'bold', color: '#000' },
  activeProjectName: { fontSize: 16, color: '#000', marginTop: 8 },
  stopButton: { alignSelf: 'flex-end', marginTop: 16 },
  stopButtonText: { fontWeight: 'bold', color: '#000' },
  entriesList: { flex: 1 },
  sectionTitle: { fontSize: 18, color: '#fff', marginBottom: 16, fontWeight: '600' },
  entryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  entryInfo: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 12 },
  entryName: { color: '#fff', fontSize: 16 },
  entryRight: { flexDirection: 'row', alignItems: 'center' },
  entryDuration: { color: '#aaa', fontSize: 14, marginRight: 12 },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  fab: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
