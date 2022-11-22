/* eslint-disable prettier/prettier */
import Geolocation, {
    GeoWatchOptions,
    GeoCoordinates,
} from 'react-native-geolocation-service';

const options: GeoWatchOptions = {
    enableHighAccuracy: true,
    interval: 2000,
    distanceFilter: 3,
    showLocationDialog: false,
};

export function watchGeolocation({
    onPositionChange,
}: {
    onPositionChange: (position: GeoCoordinates) => Promise<void> | void;
}) {
    const watchId = Geolocation.watchPosition(
        position => position.coords && onPositionChange(position.coords),
        undefined,
        options,
    );
    return {
        clearWatchId: () => Geolocation.clearWatch(watchId),
    };
}