import React from 'react';
import { View, StatusBar } from 'react-native';
import HeroesList from './pages/HeroesList'

const App: React.FC = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    <HeroesList />
  </>
);
export default App;