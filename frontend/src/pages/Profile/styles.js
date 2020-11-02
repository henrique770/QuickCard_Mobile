import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 20},
})`
  align-self: stretch;
`;

export const ButtonDelete = styled(Button)`
  background: #f00;
  border-radius: 10px;
`;
