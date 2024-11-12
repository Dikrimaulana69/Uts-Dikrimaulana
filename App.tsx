import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axiosInstance from './src/axiosInstance';
import PlantList from './src/components/PlantList';
import PlantDetail from './src/components/PlantDetail';
import PlantForm from './src/components/PlantForm';

const HomeScreen = () => {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axiosInstance.get('/plants');
        setPlants(response.data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await axiosInstance.get('/favorites');
        setFavorites(response.data.map(plant => plant.id));
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchPlants();
    fetchFavorites();
  }, [isAdding, selectedPlant]);

  const handleAddPlant = async newPlantData => {
    try {
      const response = await axiosInstance.post('/plants', newPlantData);
      setPlants(prevPlants => [...prevPlants, response.data]);
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding plant:', error);
    }
  };

  const handleDeletePlant = async plantId => {
    try {
      await axiosInstance.delete(`/plants/${plantId}`);
      setPlants(prevPlants => prevPlants.filter(plant => plant.id !== plantId));
      setFavorites(prevFavorites => prevFavorites.filter(id => id !== plantId));
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  const toggleFavorite = async plantId => {
    try {
      if (favorites.includes(plantId)) {
        await axiosInstance.delete(`/favorites/${plantId}`);
        setFavorites(prevFavorites =>
          prevFavorites.filter(id => id !== plantId),
        );
      } else {
        await axiosInstance.post(`/favorites/${plantId}`);
        setFavorites(prevFavorites => [...prevFavorites, plantId]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {selectedPlant ? (
        <PlantDetail
          id={selectedPlant.id}
          onBack={() => setSelectedPlant(null)}
        />
      ) : isAdding ? (
        <PlantForm
          onSubmit={handleAddPlant}
          onCancel={() => setIsAdding(false)}
        />
      ) : (
        <View>
          <View style={styles.header}>
            <Text style={styles.headerText}>☘ HerbHub</Text>
            <Text style={styles.subHeaderText}>
              Ensiklopedia Tanaman Herbal
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsAdding(true)}>
            <Text style={styles.addButtonText}>Add New Plant</Text>
          </TouchableOpacity>
          <PlantList
            plants={plants}
            onPlantSelect={setSelectedPlant}
            onDeletePlant={handleDeletePlant}
            onToggleFavorite={toggleFavorite}
            favorites={favorites}
          />
          {favorites.length > 0 && (
            <View style={styles.favoritesSection}>
              <Text style={styles.sectionTitle}>Favorites</Text>
              <PlantList
                plants={plants.filter(plant => favorites.includes(plant.id))}
                onPlantSelect={setSelectedPlant}
                onDeletePlant={handleDeletePlant}
                onToggleFavorite={toggleFavorite}
                favorites={favorites}
              />
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5DC'},
  header: {padding: 20, backgroundColor: '#4CAF50', alignItems: 'center'},
  headerText: {fontSize: 28, fontWeight: 'bold', color: '#fff'},
  subHeaderText: {fontSize: 16, color: '#fff'},
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoritesSection: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#e8f5e9',
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#c8e6c9',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388e3c',
    marginBottom: 10,
  },
});

export default HomeScreen;
