import React from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import type { ParamListBase } from '@react-navigation/native';
import { ListClientItem } from '../../../components/ListClientItem/ListClientItem';
import { ClientState } from '../../../types';
// import { AddButton, ClientList, Container } from './styles';
import billingscreens from '../billingscreen.json';
import { Button, Center, FlatList, Flex, Text } from 'native-base';
import { appActions, useAppSelector } from '../../../app/appStore';
import { useDispatch } from 'react-redux';

function ListBillingScreen({
  route,
  navigation,
}: StackScreenProps<ParamListBase>) {
  const clients = useAppSelector(state => state.clients.clients);
  const isDark = useAppSelector(state => state.app.isDarkTheme);
  const dispatch = useDispatch();
  function onPress(data?: ClientState) {
    navigation.navigate(billingscreens.create, {
      params: {
        data,
      },
    });
  }
  const renderItem = ({ item }) => {
    return <ListClientItem item={item} onPress={onPress} />;
  };
  function changeTheme() {
    dispatch(appActions.setDarkTheme({ isDarkTheme: !isDark }));
  }

  return (
    <Center
      width="100%"
      padding="1"
      bg={isDark ? 'coolGray.800' : 'warmGray.50'}>
      <Button width="100%" onPress={changeTheme}>
        <Text color={isDark ? 'primary.50' : 'warmGray.50'} bold>
          Colocar Modo {isDark ? 'Claro' : 'Escuro'}
        </Text>
      </Button>
      <FlatList
        overflow="hidden"
        height="85%"
        data={clients}
        keyExtractor={(item: ClientState) => item.id}
        renderItem={renderItem}
      />
      <Flex direction="row">
        <Button width="100%" onPress={onPress}>
          Adicionar Cliente
        </Button>
      </Flex>
    </Center>
  );
}

export default ListBillingScreen;
