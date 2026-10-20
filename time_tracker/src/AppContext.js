import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [entries, setEntries] = useState([]);
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedProjects = await AsyncStorage.getItem('projects');
      const storedEntries = await AsyncStorage.getItem('entries');
      if (storedProjects) setProjects(JSON.parse(storedProjects));
      if (storedEntries) setEntries(JSON.parse(storedEntries));
    } catch (e) {
      console.error('Failed to load data', e);
    }
  };

  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Failed to save ${key}`, e);
    }
  };

  const addProject = (project) => {
    const updatedProjects = [...projects, project];
    setProjects(updatedProjects);
    saveData('projects', updatedProjects);
  };

  const addEntry = (entry) => {
    const updatedEntries = [...entries, entry];
    setEntries(updatedEntries);
    saveData('entries', updatedEntries);
  };

  const startTask = (task) => {
    setActiveTask({ ...task, startTime: new Date().toISOString() });
  };

  const stopTask = () => {
    if (activeTask) {
      const endTime = new Date().toISOString();
      const newEntry = {
        id: Math.random().toString(36).substring(7),
        projectId: activeTask.projectId,
        taskName: activeTask.taskName,
        startTime: activeTask.startTime,
        endTime,
        duration: (new Date(endTime) - new Date(activeTask.startTime)) / 1000,
      };
      addEntry(newEntry);
      setActiveTask(null);
    }
  };

  return (
    <AppContext.Provider
      value={{
        projects,
        entries,
        activeTask,
        addProject,
        addEntry,
        startTask,
        stopTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
