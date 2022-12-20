import type { ParamListBase } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { getCoords } from '../../../geolocation/getCoords';
import { ClientState, Coords } from '../../../types';
import billingscreens from '../billingscreen.json';
import { clientActions } from '../../../app/clientSlice';
import { Alert } from 'react-native';
import {
  Input,
  Heading,
  Container,
  Center,
  Button,
  ScrollView,
} from 'native-base';
import { useAppDispatch, useAppSelector } from '../../../app/appStore';

export function CreateBillingScreen({
  route,
  navigation,
}: StackScreenProps<ParamListBase>) {
  const params = route.params as any;
  const paramsClient = params.params.data;
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>('');
  const [dateWorked, setDateWorked] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const clients = useAppSelector(state => state.clients);
  const isDark = useAppSelector(state => state.app.isDarkTheme);

  useEffect(() => {
    if (paramsClient.id) {
      setName(paramsClient.name);
      setDateWorked(paramsClient.dateWorked);
      setPrice(paramsClient.price);
      setPhone(paramsClient.phone);
      setLatitude(Number(paramsClient.coords.latitude));
      setLongitude(Number(paramsClient.coords.longitude));
    } else {
      getCoords().then(async coords => {
        setDateWorked(new Date().toLocaleDateString('pt-BR'));
        setLatitude(Number(coords?.latitude));
        setLongitude(Number(coords?.longitude));
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

    let clientsFilter = clients.clients.filter(c => c.id !== clientState.id);
    clientsFilter.unshift(clientState);

    dispatch(clientActions.setClients({ clients: clientsFilter }));

    navigation.navigate(billingscreens.list);
  }
  return (
    <ScrollView height="full" bg={isDark ? 'coolGray.800' : 'warmGray.50'}>
      <Center height="full">
        <Container alignItems="center">
          <Heading
            mx="auto"
            fontSize="2xl"
            marginBottom="1"
            color={isDark ? 'primary.50' : 'coolGray.800'}>
            Cliente
          </Heading>
          <Input
            color={isDark ? 'primary.50' : 'coolGray.800'}
            marginBottom="2"
            width="100%"
            placeholder="Nome"
            onChangeText={setName}
            value={String(name)}
          />
          <Input
            color={isDark ? 'primary.50' : 'coolGray.800'}
            marginBottom="2"
            width="100%"
            placeholder="Telefone"
            keyboardType="numeric"
            onChangeText={setPhone}
            value={String(phone)}
          />
          <Input
            color={isDark ? 'primary.50' : 'coolGray.800'}
            width="100%"
            marginBottom="2"
            placeholder="Dia do serviço"
            keyboardType="numeric"
            onChangeText={setDateWorked}
            value={String(dateWorked)}
          />
          <Input
            width="100%"
            color={isDark ? 'primary.50' : 'coolGray.800'}
            placeholder="Preço"
            marginBottom="2"
            keyboardType="numeric"
            onChangeText={setPrice}
            value={String(price)}
          />
          <Input
            width="100%"
            marginBottom="2"
            color={isDark ? 'primary.50' : 'coolGray.800'}
            placeholder="Longitude"
            keyboardType="numeric"
            onChangeText={(value: string) => setLongitude(Number(value))}
            value={String(longitude)}
          />
          <Input
            width="100%"
            color={isDark ? 'primary.50' : 'coolGray.800'}
            placeholder="Latitude"
            marginBottom="2"
            keyboardType="numeric"
            onChangeText={(value: string) => setLatitude(Number(value))}
            value={String(latitude)}
          />
        </Container>
        <Button width="80%" marginTop="10" onPress={onSave}>
          Salvar
        </Button>
      </Center>
    </ScrollView>
  );
}

export default CreateBillingScreen;
