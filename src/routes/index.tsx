import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import HeroesList from '../pages/HeroesList';

const Cards = createStackNavigator();

const CardRoutes: React.FC = () => (
  <Cards.Navigator>
    <Cards.Screen
      name="Heroes started with letter A"
      component={HeroesList}
      options={{
        headerStyle: {
          backgroundColor: '#151515',
        },
        headerTintColor: '#fff',
      }}
    />
  </Cards.Navigator>
);

export default CardRoutes;
