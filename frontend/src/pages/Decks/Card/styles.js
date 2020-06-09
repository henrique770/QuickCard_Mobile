import styled from 'styled-components/native';
import {ButtonTheme} from '~/styles/global';
import {RectButton} from 'react-native-gesture-handler';

export const FlipCardBox = styled.View`
  width: 300px;
  height: 400px;
  border-radius: 10px;
  align-items: center;
  background-color: ${props => props.theme.backgroundbox};
`;
export const ContainerFlashCard = styled.View`
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

export const Button = styled(ButtonTheme)`
  padding: 15px;
  width: 85px;
  display: flex;
  justify-content: center;
  margin: 0 10px;
`;

export const EndButton = styled(RectButton)`
  height: 46px;
  width: 300px;
  background: #fe650e;
  border-radius: 10px;
  padding: 0 30px;
  align-items: center;
  justify-content: center;
`;
