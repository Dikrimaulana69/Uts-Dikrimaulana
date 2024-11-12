import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const PlantCard = ({plant, onPress, onDelete}) => (
  <View style={styles.featuredCard}>
    <TouchableOpacity
      onPress={() => onDelete(plant.id)}
      style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>✗</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.cardContentContainer} onPress={onPress}>
      <Image source={{uri: plant.image}} style={styles.featuredImage} />
      <View style={styles.cardContent}>
        <Text style={styles.featuredTitle}>{plant.name}</Text>
        <Text style={styles.featuredCategory}>{plant.category}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  featuredCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#ff4444',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: '50%',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardContentContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  featuredImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  cardContent: {flex: 1, justifyContent: 'center'},
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  featuredCategory: {fontSize: 14, color: '#81C784'},
});

export default PlantCard;
