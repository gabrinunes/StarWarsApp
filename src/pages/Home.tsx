import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const [searchText, SetSearchText] = useState<string>('');

  const navigation = useNavigation();

  function handleDetailsPage(search: string) {
    if (search === '') {
      Alert.alert('Por favor digite sua pesquisa');
    } else {
      navigation.navigate('Detail', {search});
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchTextContainer}>
        <View style={styles.searchText}>
          <TextInput
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
        <Text>Favoritos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver',
  },
  searchTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchText: {
    width: 380,
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
