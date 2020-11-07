import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';

interface Film {
  title: string;
  director: string;
  producer: string;
  release_date: string;
  planets: Array<string>;
  starships: Array<string>;
  vehicles: Array<string>;
  species: Array<string>;
}

interface Vehicle {
  name: string;
  model: string;
  manufacturer: string;
  const_in_credits: string;
  length: string;
  max_atmospherering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
}

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  lenght: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  starship_class: string;
}

export default function Detail() {
  const route = useRoute();
  const [film, SetFilm] = useState<Film>();
  const [vehicle, SetVehicle] = useState<Vehicle>();
  const [starship, SetStarhip] = useState<Starship>();
  const search = route.params.payload;
  console.log('vindo do result', search);

  useEffect(() => {
    axios.get(`${search}`).then((response) => {
      SetFilm(response.data);
      SetVehicle(response.data);
      SetStarhip(response.data);
    });
  }, [search]);

  if (!film) {
    return <Text>Carregando...</Text>;
  }

  if (!vehicle) {
    return <Text>Carregando...</Text>;
  }

  if (!starship) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={{flex: 1}}>
      {film.director ? (
        <View style={styles.Container}>
          <Text>{film.title}</Text>
          <Text>{film.director}</Text>
          <Text>{film.producer}</Text>
        </View>
      ) : null}
      {vehicle.vehicle_class ? (
        <View style={styles.Container}>
          <Text>Name:</Text>
          <Text>{vehicle.name}</Text>
          <Text>Model:</Text>
          <Text>{vehicle.model}</Text>
          <Text>Manufacturer:</Text>
          <Text>{vehicle.manufacturer}</Text>
          <Text>Cost:</Text>
          <Text>{vehicle.const_in_credits}</Text>
          <Text>Consumables:</Text>
          <Text>{vehicle.consumables}</Text>
          <Text>Capacity:</Text>
          <Text>{vehicle.cargo_capacity}</Text>
          <Text>Vehicle Class:</Text>
          <Text>{vehicle.vehicle_class}</Text>
        </View>
      ) : null}
      {starship.starship_class ? (
        <View style={styles.Container}>
          <Text>Name:</Text>
          <Text>{starship.name}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginTop: 28,
  },
});
