import type { ParamListBase } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ClientStorage } from '../../../app/ClientStorage';
import { getCoords } from '../../../geolocation/getCoords';
import { ClientState, Coords } from '../../../types';
import { Container, FormContainer, Input, SaveButton, Title } from './styles';
import billingscreens from '../billingscreen.json';
import { Alert } from 'react-native';
export function CreateBillingScreen({
  route,
  navigation,
}: StackScreenProps<ParamListBase>) {
  const params = route.params as any;
  const paramsClient = params.params.data;
  const updateData = params.params.fetchData;
  console.log(paramsClient);
  const [name, setName] = useState<string>('');
  const [dateWorked, setDateWorked] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');

  useEffect(() => {
    if (paramsClient.id) {
      setName(paramsClient.name);
      setDateWorked(paramsClient.dateWorked);
      setPrice(paramsClient.price);
      setPhone(paramsClient.phone);
      setLatitude(paramsClient.coords.latitude);
      setLongitude(paramsClient.coords.longitude);
    } else {
      getCoords().then(async coords => {
        setDateWorked(new Date().toLocaleDateString('pt-BR'));
        setLatitude(String(coords?.latitude));
        setLongitude(String(coords?.longitude));
      });
    }
  }, []);

  async function onSave() {
    const clientState = {} as ClientState;
    let alert = false;
    if (!dateWorked) alert = true;
    if (!name) alert = true;
    if (!price) alert = true;
    if (!phone) alert = true;
    if (!latitude) alert = true;
    if (!longitude) alert = true;

    if (alert) {
      Alert.alert('Atenção', 'Preencha todos os campos!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      return;
    }
    if (paramsClient.id) {
      clientState.id = paramsClient.id;
    } else {
      clientState.id = String(new Date().getTime());
    }

    clientState.name = name;
    clientState.dateWorked = dateWorked;
    clientState.price = price;
    clientState.phone = phone;
    clientState.coords = {} as Coords;
    clientState.coords.latitude = latitude;
    clientState.coords.longitude = longitude;
    const clients = await ClientStorage.getStorage();
    let clientsFilter = clients.filter(c => c.id !== clientState.id);
    clientsFilter.unshift(clientState);

    await ClientStorage.setStorage(clientsFilter);
    updateData();
    navigation.navigate(billingscreens.list);
  }
  return (
    <Container>
      <FormContainer>
        <Title>Cliente</Title>
        <Input placeholder="Nome" onChangeText={setName} value={String(name)} />
        <Input
          placeholder="Telefone"
          keyboardType="numeric"
          onChangeText={setPhone}
          value={String(phone)}
        />
        <Input
          placeholder="Dia do serviço"
          keyboardType="numeric"
          onChangeText={setDateWorked}
          value={String(dateWorked)}
        />
        <Input
          placeholder="Preço"
          keyboardType="numeric"
          onChangeText={setPrice}
          value={String(price)}
        />
        <Input
          placeholder="Longitude"
          keyboardType="numeric"
          onChangeText={setLongitude}
          value={longitude}
        />
        <Input
          placeholder="Latitude"
          keyboardType="numeric"
          onChangeText={setLatitude}
          value={latitude}
        />
      </FormContainer>
      <SaveButton onPress={onSave} title="Salvar" />
    </Container>
  );
}

export default CreateBillingScreen;
