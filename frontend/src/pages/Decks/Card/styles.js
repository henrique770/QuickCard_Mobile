import styled from 'styled-components/native';
import {ButtonTheme} from '~/styles/global';

export const FlipCardBox = styled.View`
  width: 300px;
  height: 400px;
  margin-top: 100px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.backgroundbox};
`;

export const Button = styled(ButtonTheme)`
  padding: 15px;
  width: 85px;
  display: flex;
  justify-content: center;
  margin: 0 10px;
`;
