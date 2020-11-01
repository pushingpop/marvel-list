import React from 'react';

import {Container, Image, Text} from './styles';

interface HeroProps {
  imageUrl: string;
  name: string;
}

const Card: React.FC<HeroProps> = ({imageUrl, name}) => (
  <Container>
    <Image source={{uri: imageUrl}} />
    <Text>{name}</Text>
  </Container>
);

export default Card;
