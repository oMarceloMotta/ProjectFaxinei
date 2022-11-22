import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClientState } from '../types';
import { debounce } from '../utils/debounce';

const storagePath = 'clientss';
const writeUserToStorageInterval = 2000;

export class ClientStorage {
  static async getStorage(): Promise<Array<ClientState>> {
    const storage = await AsyncStorage.getItem(storagePath);
    if (storage) {
      return JSON.parse(storage);
    }
    const state: Array<ClientState> = [];
    return state;
  }

  static async setStorage(state: Array<ClientState>) {
    return AsyncStorage.setItem(storagePath, JSON.stringify(state));
  }

  static syncAppStorage = debounce(async (clients: Array<ClientState>) => {
    if (clients.length === 0) {
      return;
    }

    await ClientStorage.setStorage(clients);
  }, writeUserToStorageInterval);
}
