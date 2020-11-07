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

export default function Detail() {
  const route = useRoute();
  const [film, SetFilm] = useState<Film>();
  const [vehicle, SetVehicle] = useState<Vehicle>();
  const search = route.params.payload;
  console.log('vindo do result', search);

  useEffect(() => {
    axios.get(`${search}`).then((response) => {
      SetFilm(response.data);
      SetVehicle(response.data);
    });
  }, [search]);

  if (!film) {
    return <Text>Carregando...</Text>;
  }

  if (!vehicle) {
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
      {vehicle.manufacturer ? (
        <View style={styles.Container}>
          <Text>{vehicle.name}</Text>
          <Text>{vehicle.model}</Text>
          <Text>{vehicle.manufacturer}</Text>
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
