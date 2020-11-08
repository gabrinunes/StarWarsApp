import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useFavorites} from '../hooks/useFavorite';

export default function Home() {
  const [searchText, SetSearchText] = useState<string>('');

  const navigation = useNavigation();

  const {favorites} = useFavorites();

  function handleDetailsPage(search: string) {
    if (search === '') {
      Alert.alert('Por favor digite sua pesquisa');
    } else {
      navigation.navigate('ResultList', {search});
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchTextContainer}>
        <View style={styles.searchText}>
          <TextInput
            style={{padding: 10}}
            value={searchText}
            onChangeText={(text) => SetSearchText(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => handleDetailsPage(searchText)}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Favoritos:</Text>
        <ScrollView>
          <View style={{flex: 1}}>
            {favorites.map((fav) => (
              <TouchableOpacity onPress={() => handleDetailsPage(fav)}>
                <Text style={styles.favoriteTextContainer}>{fav}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver',
  },
  favoriteTextContainer: {
    width: Dimensions.get('window').width,
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginTop: 28,
  },
  searchTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchText: {
    width: Dimensions.get('screen').width,
    height: 50,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  searchButton: {
    width: 200,
    height: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  searchButtonText: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
