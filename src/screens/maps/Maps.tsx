import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MapContainer } from './styles';
import MapView, { MapMarker, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { AppContext } from '../../app/AppContext';

import screens from '../../screens.json';
import billingscreens from '../billing/billingscreen.json';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ParamListBase, useFocusEffect } from '@react-navigation/native';
import { ClientState } from '../../types';
import { ClientStorage } from '../../app/ClientStorage';
const delta = 0.003;
const markerAnimationDuration = 1000;
const markerSize = 42;
export function MapsScreen({
  route,
  navigation,
}: BottomTabScreenProps<ParamListBase>) {
  let {
    appState: { user },
  } = useContext(AppContext);
  const [data, setData] = useState<Array<ClientState>>([]);

  async function fetchData() {
    const clients: Array<ClientState> = await ClientStorage.getStorage();
    setData(clients);
  }
  useEffect(() => {
    fetchData();
  });

  const markersRef = useRef({} as { [key: string]: MapMarker | undefined });
  function onPress(item) {
    Alert.alert('Cliente', `${item.name} / ${item.phone}`, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  }
  return (
    <MapContainer>
      <MapView
        showsUserLocation
        showsBuildings={false}
        showsIndoors={false}
        showsMyLocationButton={true}
        showsCompass={false}
        toolbarEnabled={false}
        style={styles.map}
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
    </MapContainer>
  );
}
const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapsScreen;
