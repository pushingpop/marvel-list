import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {Md5} from 'ts-md5/dist/md5';

import Card from '../../components/Card';

import {Container, LoadMore} from './styles';

const PUBLIC_KEY = 'd8b0b85095fcdd91e84e31a632ced73d';
const PRIVATE_KEY = 'bbc8ba7d7e0d583d709b30d9c1d1d975f76f6dc8';
const baseUrl = 'https://gateway.marvel.com/v1/public/';

interface HeroProps {
  item: {
    id: Number;
    name: string;
    thumbnail: {
      extension: string;
      path: string;
    };
  };
}

const HeroesList: React.FC = () => {
  const [heroes, setHeroes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setpageCurrent] = useState(0);
  const [pageMax, setpageMax] = useState(Number);

  const getData = async () => {
    const timestamp = Number(new Date());
    const hash = new Md5();

    hash.appendStr(timestamp + PRIVATE_KEY + PUBLIC_KEY);

    const queryUrl = `characters?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash.end()}&nameStartsWith=a&orderBy=name&offset=${
      20 * pageCurrent
    }`;

    fetch(`${baseUrl}${queryUrl}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setHeroes(heroes.concat(data.data.results));
        setpageMax(data.data.total);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    console.log('Page current');
    getData();
  }, [pageCurrent]);

  const renderFooter = () => {
    return isLoading && heroes.length < pageMax ? (
      <LoadMore>
        <ActivityIndicator size="large" color="#000000" />
      </LoadMore>
    ) : null;
  };

  const handleLoadMore = () => {
    !isLoading && heroes.length < pageMax && setpageCurrent(pageCurrent + 1);
    setIsLoading(true);
  };

  return (
    <Container>
      <FlatList
        data={heroes}
        keyExtractor={hero => hero.id.toString()}
        renderItem={HeroShow}
        numColumns={2}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </Container>
  );
};

const HeroShow = (item: HeroProps) => {
  const imageUrl = `${item.item.thumbnail.path}.${item.item.thumbnail.extension}`;

  return <Card imageUrl={imageUrl} name={item.item.name} />;
};

export default HeroesList;
