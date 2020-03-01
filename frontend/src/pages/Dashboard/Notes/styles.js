import styled from 'styled-components/native';

import Input from '~/components/Input';

export const Container = styled.SafeAreaView`
  background-color: #fff;
  flex: 1;
`;

export const TextNote = styled.Text`
  font-size: 16px;
  color: #656565;
  align-self: flex-start;
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const TagDeckInput = styled(Input)`
  margin-bottom: 10px;
`;

export const ContainerTag = styled.View`
  padding: 0 15px;
  height: 46px;

  border-radius: 4px;

  flex-direction: row;
  align-items: center;
`;

export const TagInput = styled.TextInput.attrs({
  placeholderTextColor: '#656565',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #656565;
`;
