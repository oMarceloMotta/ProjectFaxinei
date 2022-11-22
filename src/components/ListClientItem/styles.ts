import { Pressable } from 'react-native';
import styled from 'styled-components/native';
export const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-size: 14px;
  color:#707070;
`;
export const ContainerTitle = styled.View`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;
export const ContainerDescription = styled.View`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;
export const Description = styled.Text`
  color:#707070;
`;

export const DateText = styled.Text`
  color: #808080;
`;

export const PressButton = styled(Pressable).attrs()`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 60px;
  border-bottom-color: black;
  border-bottom-width: 2px;
`;
