import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import api from '../service/api';
import {useRoute, useNavigation} from '@react-navigation/native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

interface Characters {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: Array<string>;
  species: Array<string>;
  vehicles: Array<string>;
  starships: Array<string>;
}

export default function ResultLit() {
  const route = useRoute();
  const [character, SetCharacter] = useState<Characters[]>();
  const searchText = route.params.search;
  const navigation = useNavigation();
  useEffect(() => {
    api
      .get(`people/?search=${searchText}`)
      .then((res) => SetCharacter(res.data.results));
  }, [searchText]);

  function handleSelected(payload: string) {
    navigation.navigate('Detail', {payload});
  }

  function handelFavorite(payload: string) {
    console.log(payload);
  }
  return (
    <View>
      <ScrollView>
        {character?.map((char, id) => (
          <View key={id} style={styles.characterContainer}>
            <Text style={styles.characterLabel}>Name:</Text>
            <Text style={styles.characterLabelText}>{char.name}</Text>
            <Text style={styles.characterLabel}>Gender:</Text>
            <Text style={styles.characterLabelText}>{char.gender}</Text>
            <Text style={styles.characterLabel}>Height:</Text>
            <Text style={styles.characterLabelText}>{char.height}</Text>
            <Text style={styles.characterLabel}>HomeWorld:</Text>
            <Text style={styles.characterLabelText}>{char.homeworld}</Text>

            <Text style={styles.characterLabel}>Films:</Text>

            {char.films.map((films, id) => (
              <TouchableOpacity onPress={() => handleSelected(films)}>
                <Text key={id} style={styles.characterLabelText}>
                  {films}
                </Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.characterLabel}>Vehicles:</Text>

            {char.vehicles.map((vehicles, id) => (
              <TouchableOpacity onPress={() => handleSelected(vehicles)}>
                <Text key={id} style={styles.characterLabelText}>
                  {vehicles}
                </Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.characterLabel}>Starships:</Text>

            {char.starships.map((starships, id) => (
              <TouchableOpacity onPress={() => handleSelected(starships)}>
                <Text key={id} style={styles.characterLabelText}>
                  {starships}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => handelFavorite(char.name)}
              style={styles.favoriteButton}>
              <Text>Favoritar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  characterContainer: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginTop: 28,
  },
  characterLabel: {
    fontSize: 20,
    marginTop: 12,
  },
  characterLabelText: {
    fontSize: 16,
    marginTop: 5,
  },
  favoriteButton: {
    width: 200,
    height: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'silver',
  },
});
