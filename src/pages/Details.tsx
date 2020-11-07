import React, {useEffect} from 'react';
import {View} from 'react-native';
import api from '../service/api';
import {useRoute} from '@react-navigation/native';

export default function Details() {
  const route = useRoute();
  const searchText = route.params.search;
  useEffect(() => {
    api
      .get(`people/?search=${searchText}`)
      .then((res) => console.log(res.data));
  }, [searchText]);
  return <View />;
}
