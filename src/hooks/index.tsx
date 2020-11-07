import React from 'react';

import {FavProvider} from './useFavorite';

const AppProvider: React.FC = ({children}) => {
  return <FavProvider>{children}</FavProvider>;
};

export default AppProvider;
