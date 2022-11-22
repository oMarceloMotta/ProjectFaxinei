import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Container } from './styles';

export function Loader() {
  return (
    <Container>
      <ActivityIndicator size={64} />
    </Container>
  );
}
