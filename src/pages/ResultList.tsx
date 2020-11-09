import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../service/api';
import {useRoute, useNavigation} from '@react-navigation/native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useFavorites} from '../hooks/useFavorite';

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

interface Planet {
  name: string;
}

export default function ResultLit() {
  const route = useRoute();
  const {goBack} = useNavigation();
  const {addFavorites, favorites} = useFavorites();
  const [character, SetCharacter] = useState<Characters[]>();
  const [planets, SetPlanets] = useState<Planet | undefined>();
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

  async function DisplayPlanet(payload: string) {
    const response = await api.get(payload);
    SetPlanets(response.data);
    setTimeout(ClearDisplayPlanet, 1000);
  }

  function ClearDisplayPlanet() {
    SetPlanets('');
    console.log('executar uma vez');
  }

  const favFind = favorites.find((fav) => fav === searchText);

  if (!character) {
    return <Text>Carregando...</Text>;
  }

  if (character.length === 0) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 16}}>
          Não foi possível encontrar o personagem buscado :(
        </Text>
        <TouchableOpacity style={styles.BackHomeButton} onPress={goBack}>
          <Text style={styles.BackHomeButtonText}>Home</Text>
        </TouchableOpacity>
      </View>
    );
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
            <TouchableOpacity onPress={() => DisplayPlanet(char.homeworld)}>
              <Text style={styles.characterLabelText}>{char.homeworld}</Text>
              <Text style={styles.characterLabelText}>{planets?.name}</Text>
            </TouchableOpacity>

            <Text style={styles.characterLabel}>Films:</Text>

            {char.films.map((films, id1) => (
              <TouchableOpacity onPress={() => handleSelected(films)}>
                <Text key={id1} style={styles.characterLabelText}>
                  {films}
                </Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.characterLabel}>Vehicles:</Text>

            {char.vehicles.map((vehicles, id2) => (
              <TouchableOpacity onPress={() => handleSelected(vehicles)}>
                <Text key={id2} style={styles.characterLabelText}>
                  {vehicles}
                </Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.characterLabel}>Starships:</Text>

            {char.starships.map((starships, id3) => (
              <TouchableOpacity onPress={() => handleSelected(starships)}>
                <Text key={id3} style={styles.characterLabelText}>
                  {starships}
                </Text>
              </TouchableOpacity>
            ))}
            {!favFind ? (
              <TouchableOpacity
                onPress={() => addFavorites(char.name)}
                style={styles.favoriteButton}>
                <Text>Favoritar</Text>
              </TouchableOpacity>
            ) : null}
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
  BackHomeButton: {
    width: 200,
    height: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  BackHomeButtonText: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
