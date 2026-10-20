import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { AppContext } from '../AppContext';

const COLORS = ['#EF4444', '#F97316', '#FACC15', '#4ADE80', '#3B82F6', '#8B5CF6', '#EC4899', '#64748B'];

export default function AddProjectScreen({ navigation }) {
  const { addProject } = useContext(AppContext);
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleSave = () => {
    if (!name.trim()) return;
    addProject({
      id: Math.random().toString(36).substring(7),
      name,
      color: selectedColor,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Project Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter project name"
        placeholderTextColor="#888"
        autoFocus
      />

      <Text style={styles.label}>Select Color</Text>
      <View style={styles.colorGrid}>
        {COLORS.map(color => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorCircle,
              { backgroundColor: color },
              selectedColor === color && styles.selectedCircle,
            ]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Create Project</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  label: { color: '#fff', fontSize: 16, marginBottom: 8, fontWeight: '600' },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 24,
  },
  colorGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 32 },
  colorCircle: { width: 48, height: 48, borderRadius: 24, margin: 8 },
  selectedCircle: { borderWidth: 4, borderColor: '#fff' },
  saveButton: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
