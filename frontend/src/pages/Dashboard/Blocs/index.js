import React from 'react';

import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';

import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  StyleSheet,
  View,
} from 'react-native';
import IconMi from 'react-native-vector-icons/MaterialIcons';

import Swipeable from 'react-native-swipeable-row';

import * as S from '~/styles/global';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const Text = Typography;

console.disableYellowBox = true;

function Blocs({navigation, ...props}) {
  const rightButtons = [
    <S.Box
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        borderRadius: 0,
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={() =>
          Alert.alert('Alerta', 'Você tem certeza que quer excluir?', [
            {
              text: 'Não',
              onPress: () => console.log('Excluir'),
              style: 'Cancelar',
            },
            {
              text: 'Sim',
              onPress: () => {},
            },
          ])
        }>
        <Text>
          <IconMi name="close" color="#fff" size={50} />
        </Text>
      </TouchableOpacity>
    </S.Box>,
  ];
  return (
    <>
      <S.Container>
        <S.Margin />
        <S.List
          data={data}
          keyExtractor={item => String(item)}
          renderItem={({item}) => (
            <Swipeable autoClose={true} rightButtons={rightButtons}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Notes')}>
                <S.Box data={item}>
                  <S.Text weight="bold" size="16">
                    QuickCard
                  </S.Text>
                  <Spacing mt="4" mb="4">
                    <Text size="14" color="#656565">
                      QuickCard é um software de estudo que tem como principais
                      caracteristicas
                    </Text>
                  </Spacing>
                  <Text color="#fe650e">Primeiro Caderno</Text>
                </S.Box>
              </TouchableWithoutFeedback>
            </Swipeable>
          )}
        />
      </S.Container>
    </>
  );
}

export default Blocs;
