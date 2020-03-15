import styled from 'styled-components/native';
import Typography from '~/components/Typography';

export const Box = styled.View`
  margin-bottom: 15px;
  padding: 20px;
  max-height: 160px;
  border-radius: 12px;
  background: ${props => props.theme.backgroundbox};
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${props => props.theme.background};
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const Text = styled(Typography)`
  color: ${props => props.theme.primaryText};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 15,
  },
})``;
