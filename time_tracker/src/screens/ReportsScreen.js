import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { AppContext } from '../AppContext';

const screenWidth = Dimensions.get('window').width;

export default function ReportsScreen() {
  const { entries, projects } = useContext(AppContext);

  const getChartData = () => {
    return {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          data: [2, 4, 5, 3, 6, 2, 8] // Mocked for visuals
        }
      ]
    };
  };

  const getPieData = () => {
    if (projects.length === 0) {
      return [{ name: 'None', duration: 1, color: '#333', legendFontColor: '#888', legendFontSize: 14 }];
    }
    return projects.map((p, i) => ({
      name: p.name,
      duration: Math.max(1, i + 1), // Mocked for visual if no entries
      color: p.color,
      legendFontColor: '#fff',
      legendFontSize: 12,
    }));
  };

  const chartConfig = {
    backgroundGradientFrom: "#1e1e1e",
    backgroundGradientTo: "#1e1e1e",
    color: (opacity = 1) => `rgba(236, 72, 153, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Reports</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Duration per day</Text>
        <BarChart
          data={getChartData()}
          width={screenWidth - 64}
          height={220}
          yAxisLabel=""
          yAxisSuffix="h"
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          style={styles.chart}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Projects Breakdown</Text>
        <PieChart
          data={getPieData()}
          width={screenWidth - 64}
          height={200}
          chartConfig={chartConfig}
          accessor={"duration"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
  card: { backgroundColor: '#1e1e1e', borderRadius: 12, padding: 16, marginBottom: 16 },
  cardTitle: { color: '#fff', fontSize: 16, marginBottom: 16, fontWeight: '600' },
  chart: { borderRadius: 8, marginVertical: 8 },
});
