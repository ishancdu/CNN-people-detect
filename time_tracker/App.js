import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Calendar, Clock, BarChart2 } from 'lucide-react-native';

import { AppProvider } from './src/AppContext';

// Screens
import TimelineScreen from './src/screens/TimelineScreen';
import ProjectsScreen from './src/screens/ProjectsScreen';
import AddProjectScreen from './src/screens/AddProjectScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import ReportsScreen from './src/screens/ReportsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#1e1e1e', borderTopColor: '#333' },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tab.Screen
        name="Timeline"
        component={TimelineScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Clock color={color} size={size} />
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <BarChart2 color={color} size={size} />
        }}
      />
    </Tab.Navigator>
  );
}

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    card: '#1e1e1e',
    text: '#ffffff',
  },
};

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer theme={CustomDarkTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={HomeTabs} />
          <Stack.Screen
            name="Projects"
            component={ProjectsScreen}
            options={{ headerShown: true, title: 'Projects', headerStyle: { backgroundColor: '#121212' }, headerTintColor: '#fff' }}
          />
          <Stack.Screen
            name="AddProject"
            component={AddProjectScreen}
            options={{ presentation: 'modal', headerShown: true, title: 'Add Project', headerStyle: { backgroundColor: '#121212' }, headerTintColor: '#fff' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
