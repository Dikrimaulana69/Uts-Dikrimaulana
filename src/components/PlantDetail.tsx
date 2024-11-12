import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import axiosInstance from '../axiosInstance';

const PlantDetail = ({id, onBack}) => {
  const [plant, setPlant] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [editedPlant, setEditedPlant] = useState({
    name: '',
    category: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    const fetchPlantDetails = async () => {
      try {
        const response = await axiosInstance.get(`/plants/${id}`);
        setPlant(response.data);
        setEditedPlant(response.data);

        try {
          const favoriteResponse = await axiosInstance.get(`/favorites/${id}`);
          setIsFavorite(favoriteResponse.data.isFavorite);
        } catch (favErr) {
          if (favErr.response && favErr.response.status === 404) {
            setIsFavorite(false);
          } else {
            console.error('Error fetching favorite status:', favErr);
          }
        }
      } catch (err) {
        if (err.response) {
          console.error('API error:', err.response.status, err.response.data);
        } else if (err.request) {
          console.error(
            'Network error or no response from server:',
            err.request,
          );
        } else {
          console.error('Unexpected error:', err.message);
        }
        setError('Tanaman tidak ditemukan.');
      }
    };

    fetchPlantDetails();
  }, [id]);

  const handleEditChange = (field, value) => {
    setEditedPlant({...editedPlant, [field]: value});
  };

  const onEdit = async () => {
    try {
      const response = await axiosInstance.put(`/plants/${id}`, editedPlant);
      setPlant(response.data);
      setIsEditing(false);
    } catch (err) {
      setError('Gagal memperbarui tanaman.');
      console.error('Error updating plant:', err);
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axiosInstance.delete(`/favorites/${id}`);
      } else {
        await axiosInstance.post(`/favorites/${id}`);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Error toggling favorite:', err);
      setError('Gagal mengubah status favorit.');
    }
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!plant) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.detailContainer}>
      <TouchableOpacity onPress={onBack} style={styles.backButtonContainer}>
        <Text style={styles.backButton}>◀ Back to Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setIsEditing(true)}
        style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit ✎</Text>
      </TouchableOpacity>

      {isEditing ? (
        <View style={styles.editForm}>
          <TextInput
            style={styles.input}
            value={editedPlant.name}
            onChangeText={text => handleEditChange('name', text)}
          />
          <TextInput
            style={styles.input}
            value={editedPlant.category}
            onChangeText={text => handleEditChange('category', text)}
          />
          <TextInput
            style={styles.input}
            value={editedPlant.description}
            onChangeText={text => handleEditChange('description', text)}
          />
          <TextInput
            style={styles.input}
            value={editedPlant.image}
            onChangeText={text => handleEditChange('image', text)}
          />
          <TouchableOpacity
            onPress={onEdit}
            style={styles.saveButton}
            activeOpacity={0.8}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Image source={{uri: plant.image}} style={styles.detailImage} />
          <Text style={styles.detailTitle}>{plant.name}</Text>
          <Text style={styles.detailCategory}>{plant.category}</Text>
          <Text style={styles.detailDescription}>{plant.description}</Text>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}>
            <Text style={styles.favoriteButtonText}>
              {isFavorite ? 'Unfavorite ❤️' : 'Favorite 💚'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  backButtonContainer: {marginBottom: 15, alignSelf: 'flex-start'},
  backButton: {fontSize: 16, color: '#4CAF50'},
  editButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  editButtonText: {color: '#fff', fontSize: 16},
  detailImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  detailCategory: {fontSize: 18, color: '#81C784', marginBottom: 10},
  detailDescription: {fontSize: 16, color: '#4CAF50'},
  loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  errorContainer: {padding: 20, alignItems: 'center'},
  errorText: {fontSize: 16, color: 'red'},
  editForm: {width: '100%', padding: 20},
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#388E3C',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  favoriteButton: {
    marginTop: 20,
    backgroundColor: '#FFEB3B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FBC02D',
  },
  favoriteButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default PlantDetail;
