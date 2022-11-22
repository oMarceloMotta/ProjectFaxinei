import React from 'react';
import {
  Container,
  ContainerDescription,
  ContainerTitle,
  DateText,
  Description,
  Title,
  PressButton,
} from './styles';

export function ListClientItem({ item, onPress }: any) {
  function onPressClient() {
    onPress(item);
  }
  return (
    <PressButton onPress={onPressClient}>
      <Container>
        <ContainerTitle>
          <Title>{item.name}</Title>
          <DateText>{item.phone}</DateText>
        </ContainerTitle>
        <ContainerDescription>
          <Description>{item.dateWorked}</Description>
        </ContainerDescription>
      </Container>
    </PressButton>
  );
}
