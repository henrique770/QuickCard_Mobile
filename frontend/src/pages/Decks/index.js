import React, {useState, useEffect} from 'react';

import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';

import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionButton from 'react-native-action-button';
import {TouchableOpacity, Alert} from 'react-native';

import {withTheme} from 'styled-components';

import * as S from '~/styles/global';
import api from '~/services/api';

const data = [
  {
    id: '1',
    student: {},
    name: 'Linguagem Javascript',
    card: [
      {
        id: '1',
        deck: {},
        front: 'new operator',
        verse:
          'cria uma instancia de um tipo de objeto definido pelo usuário ou de um dos tipos nativos (built-in) que possuem uma função construtora.',
        isActive: true, // flag para controle de ativo/inativo
      },
      {
        id: '2',
        deck: {},
        front: 'expressão !!',
        verse: 'transforma qualquer tipo para booleano',
        isActive: true, // flag para controle de ativo/inativo
      },
      {
        id: '3',
        deck: {},
        front: 'método then()',
        verse:
          'retorna uma Promise. Possui dois argumentos, ambos são "call back functions", sendo uma para o sucesso e outra para o fracasso da promessa.',
        isActive: true, // flag para controle de ativo/inativo
      },
    ],
    isActive: true, // flag para controle de ativo/inativo
  },
  {
    id: '2',
    student: {},
    name: 'Palavras e expressões em inglês',
    card: [
      {
        id: '1',
        deck: {},
        front: 'perhaps',
        verse: 'possivelmente',
        isActive: true, // flag para controle de ativo/inativo
      },
      {
        id: '2',
        deck: {},
        front: 'to be on the ball',
        verse: 'antenado,ficar ligado',
        isActive: true, // flag para controle de ativo/inativo
      },
      {
        id: '3',
        deck: {},
        front: 'approach',
        verse: 'aproximação, abordar',
        isActive: true, // flag para controle de ativo/inativo
      },
    ],
    isActive: true, // flag para controle de ativo/inativo
  },
];
const Text = Typography;

function Decks({navigation, ...props}) {
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    async function loadDeks() {
      const response = await api.get('deck');

      setDeck(response.data);
    }

    loadDeks();
  }, []);

  function deleteDeck() {
    Alert.alert(
      'Alerta',
      `Você tem certeza que quer excluir?`,
      [
        {
          text: 'Não',
          onPress: () => console.log('Excluir'),
          style: 'Cancelar',
        },
        {
          text: 'Sim',
          onPress: () => {},
        },
      ],
      {cancelable: true},
    );
  }

  return (
    <>
      <S.Container>
        <Spacing position="absolute" top="18" right="30">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <IconMi name="menu" size={25} color="#FFF" />
          </TouchableOpacity>
        </Spacing>
        <S.Margin />
        <S.List
          data={data}
          numColumns={2}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item: flashcard}) => (
            <S.Container>
              <TouchableOpacity
                onPress={() => navigation.navigate('Card', {...flashcard})}
                onLongPress={() => deleteDeck()}>
                <S.Box data={flashcard} heightFixed>
                  <S.Text weight="bold" size="16" maxHeight="60">
                    {flashcard.name}
                  </S.Text>
                  <Spacing mt="4" position="absolute" bottom={20} left={20}>
                    <Text color="#656565" size="14">
                      Novos:{' '}
                      <Text color="#fe650e" weight="bold">
                        20
                      </Text>
                    </Text>
                    <Spacing mb="4" />
                    <Text color="#656565" size="14">
                      A revisar:{' '}
                      <Text color="#f93b10" weight="bold">
                        50
                      </Text>
                    </Text>
                  </Spacing>
                </S.Box>
              </TouchableOpacity>
            </S.Container>
          )}
        />
      </S.Container>

      <ActionButton buttonColor={props.theme.floatButton}>
        {/* <ActionButton.Item
          buttonColor="#333"
          title="Pomodoro"
          textContainerStyle={{
            height: 25,
          }}
          textStyle={{
            fontSize: 13,
          }}
          onPress={() => navigation.navigate('Pomodoro')}>
          <IconMc name="timer" size={30} color="#FFF" />
        </ActionButton.Item> */}
        <ActionButton.Item
          buttonColor="#333"
          title="Adicionar Cartão"
          textContainerStyle={{
            height: 25,
          }}
          textStyle={{
            fontSize: 13,
          }}
          onPress={() => navigation.navigate('AddCard')}>
          <IconMc name="cards-outline" size={30} color="#FFF" />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#333"
          title="Adicionar Baralho"
          textContainerStyle={{
            height: 25,
          }}
          textStyle={{
            fontSize: 13,
          }}
          onPress={() => navigation.navigate('AddDeck')}>
          <IconMc name="cards" size={30} color="#FFF" />
        </ActionButton.Item>
      </ActionButton>
    </>
  );
}

export default withTheme(Decks);
