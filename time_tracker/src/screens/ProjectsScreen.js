import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { AppContext } from '../AppContext';
import { PlayCircle } from 'lucide-react-native';

export default function ProjectsScreen({ navigation }) {
  const { projects, startTask } = useContext(AppContext);

  const renderItem = ({ item }) => (
    <View style={styles.projectItem}>
      <View style={styles.projectInfo}>
        <View style={[styles.dot, { backgroundColor: item.color }]} />
        <Text style={styles.projectName}>{item.name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          startTask({ projectId: item.id, taskName: item.name, color: item.color });
          navigation.goBack();
        }}
      >
        <PlayCircle color="#888" size={32} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No projects yet.</Text>}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddProject')}
      >
        <Text style={styles.addButtonText}>+ New Project</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  projectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  projectInfo: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 16, height: 16, borderRadius: 8, marginRight: 16 },
  projectName: { fontSize: 18, color: '#fff' },
  emptyText: { color: '#888', textAlign: 'center', marginTop: 32 },
  addButton: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
