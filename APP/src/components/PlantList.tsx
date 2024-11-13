import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PlantCard from './PlantCard';

const PlantList = ({plants, onPlantSelect, onDeletePlant}) => (
  <View style={styles.featuredSection}>
    <Text style={styles.sectionTitle}>Tanaman Terpilih</Text>
    {plants.length > 0 ? (
      plants.map(plant => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onPress={() => onPlantSelect(plant)}
          onDelete={() => onDeletePlant(plant.id)}
        />
      ))
    ) : (
      <Text style={styles.noPlantsText}>Tidak ada tanaman</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  featuredSection: {padding: 20},
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  noPlantsText: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PlantList;
