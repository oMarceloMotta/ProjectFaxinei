import React, { useEffect, useLayoutEffect, useState } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import type { ParamListBase } from '@react-navigation/native';
import { ListClientItem } from '../../../components/ListClientItem/ListClientItem';
import { ClientState } from '../../../types';
import { AddButton, ClientList, Container } from './styles';
import billingscreens from '../billingscreen.json';
import { ClientStorage } from '../../../app/ClientStorage';

function ListBillingScreen({
  route,
  navigation,
}: StackScreenProps<ParamListBase>) {
  const [clients, setClients] = useState<Array<ClientState>>([]);

  async function fetchData() {
    const clientsArray: Array<ClientState> = await ClientStorage.getStorage();
    setClients(clientsArray);
  }
  useEffect(() => {
    fetchData();
  }, []);

  function onPress(data) {
    navigation.navigate(billingscreens.create, {
      params: {
        data,
        fetchData,
      },
    });
  }
  const renderItem = ({ item }) => {
    return <ListClientItem item={item} onPress={onPress} />;
  };
  return (
    <Container>
      <ClientList
        data={clients}
        keyExtractor={(item: ClientState) => item.id}
        renderItem={renderItem}
      />
      <AddButton onPress={onPress} title="Adicionar Cliente" />
    </Container>
  );
}

export default ListBillingScreen;
