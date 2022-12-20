import React, { useEffect, useRef } from 'react';
import { Container } from 'native-base';
import MapView, { MapMarker, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Alert, Dimensions, StyleSheet } from 'react-native';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import { useAppSelector } from '../../app/appStore';
import mapStyleDark from './mapStyleDark.json';
import mapStyleLight from './mapStyleLight.json';

const delta = 0.003;
const markerAnimationDuration = 1000;
const markerSize = 42;

export function MapsScreen({
  route,
  navigation,
}: BottomTabScreenProps<ParamListBase>) {
  const isDarkMap = useAppSelector(state => state.app.isDarkTheme);
  const data = useAppSelector(state => state.clients.clients);
  const user = useAppSelector(state => state.app.user);
  useEffect(() => {});

  const markersRef = useRef({} as { [key: string]: MapMarker | undefined });
  function onPress(item) {
    Alert.alert('Cliente', `${item.name} / ${item.phone}`, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  }
  return (
    <Container width="full" height="full">
      <MapView
        showsUserLocation
        showsBuildings={false}
        showsIndoors={false}
        showsMyLocationButton={true}
        showsCompass={false}
        toolbarEnabled={false}
        style={styles.map}
        customMapStyle={isDarkMap ? mapStyleDark : mapStyleLight}
        region={{
          ...user.coords,
          latitudeDelta: delta,
          longitudeDelta: delta,
        }}>
        {data.map(
          item =>
            item?.id &&
            item?.coords && (
              <Marker.Animated
                coordinate={{
                  latitude: Number(item.coords.latitude),
                  longitude: Number(item.coords.longitude),
                }}
                key={item.id}
                ref={(marker: MapMarker) =>
                  (markersRef.current[item.id as string] = marker)
                }
                onPress={() => onPress(item)}
              />
            ),
        )}
      </MapView>
    </Container>
  );
}
const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapsScreen;
