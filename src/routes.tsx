import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Home from './pages/Home';
import ResultList from './pages/ResultList';
import Detail from './pages/Detail';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator screenOptions={{headerShown: false}}>
    <App.Screen name="Home" component={Home} />
    <App.Screen name="ResultList" component={ResultList} />
    <App.Screen name="Detail" component={Detail} />
  </App.Navigator>
);

export default AppRoutes;
