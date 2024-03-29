import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import {Alert} from 'react-native';

interface FavContextData {
  favorites: Array<string>;
  addFavorites(): void;
}

const FavContext = createContext<FavContextData>({} as FavContextData);

export const FavProvider: React.FC = ({children}) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  const addFavorites = useCallback(
    (payload: string) => {
      const checkFavorites = favorites.find((fav) => fav === payload);
      if (checkFavorites) {
        Alert.alert('ja foi favoritado');
      } else {
        setFavorites([...favorites, payload]);
        Alert.alert('Adicionado a sua lista de Favoritos');
      }
    },
    [favorites],
  );

  return (
    <FavContext.Provider value={{favorites, addFavorites}}>
      {children}
    </FavContext.Provider>
  );
};

export function useFavorites(): FavContextData {
  const context = useContext(FavContext);

  if (!context) {
    throw new Error('Errro');
  }
  return context;
}
