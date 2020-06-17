import React, {useState, useEffect} from 'react';

import {TouchableOpacity, TouchableWithoutFeedback, Alert} from 'react-native';

import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';

import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';

import {withTheme} from 'styled-components';
import ActionButton from 'react-native-action-button';
import Swipeable from 'react-native-swipeable-row';
import * as S from '~/styles/global';

import api from '~/services/api';

const data = [
  {
    id: '4',
    content:
      'quinoa,tofu, queijo cottage, frango, batata doce, arroz e feijao, ovo, banana,iogurte natural',
    name: 'nojunkfood',
  },
  {
    id: '2',
    content: 'Biblioteca : Redux implementa a arquitetura flux',
    name: 'Arquitetura Flux',
  },
  {
    id: '3',
    content: 'Shell - interpretador de comandos \nGui - interface gráfica',
    name: 'Sistemas operacionais',
  },
  {
    id: '1',
    content: 'QuickCard é um software de estudo que tem como principais',
    name: 'QuickCard',
  },
  {
    id: '5',
    content:
      'Bem as 5 forças de Porter concebido por Michael Porter, foi publicado na forma de artigo como  as 5 forças competitivas que moldam  a estratégia em 1979, na Havard Business Review',
    name: 'fala de quinta ( 5 estratégias competitivas de poter )',
  },
];
const Text = Typography;

function Dashboard({navigation, ...props}) {
  const [note, setNote] = useState([]);

  useEffect(() => {
    async function loadAllNotes() {
      const response = await api.get('note');

      setNote(response.data);
    }
    loadAllNotes();
  }, []);

  const rightButtons = [
    <S.Box
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        borderRadius: 0,
        right: 10,
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
          <IconMc name="trash-can" color="#fff" size={30} />
        </Text>
      </TouchableOpacity>
    </S.Box>,
  ];

  return (
    <>
      <S.Container>
        <Spacing position="absolute" right="30" top="18">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <IconMi name="menu" size={25} color="#FFF" />
          </TouchableOpacity>
        </Spacing>

        <S.Margin />
        <S.List
          data={data}
          keyExtractor={item => String(item.Id)}
          renderItem={({item}) => (
            <Swipeable autoClose={true} rightButtons={rightButtons}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('AddNote')}>
                <S.Box data={item}>
                  <S.Text weight="bold" size="16">
                    {item.Name}
                  </S.Text>
                  <Spacing mt="4" mb="4">
                    <Text size="14" color="#656565" maxHeight="50">
                      {item.Content}
                    </Text>
                  </Spacing>
                  <Text color="#fe650e">Primeiro Caderno</Text>
                </S.Box>
              </TouchableWithoutFeedback>
            </Swipeable>
          )}
        />
      </S.Container>

      <ActionButton buttonColor={props.theme.floatButton}>
        <ActionButton.Item
          buttonColor="#333"
          title="Adicionar nota"
          textContainerStyle={{
            height: 25,
          }}
          textStyle={{
            fontSize: 13,
          }}
          onPress={() => navigation.navigate('AddNote')}>
          <IconMi name="note-add" color="#fff" size={30} />
        </ActionButton.Item>
      </ActionButton>
    </>
  );
}

export default withTheme(Dashboard);
