import React, {useRef, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {TouchableOpacity, Alert} from 'react-native';
import PropTypes from 'prop-types';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import * as S from '~/styles/global';
import Spacing from '~/components/Spacing';

import { updateCard , updateDeck} from '~/store/modules/deck/actions'

import {Container, Title, Separator, Form} from './styles';

export default function EditCard({navigation , route}) {

  const dispatch = useDispatch();

  const { Card } = route.params
  const Deck = useSelector( state => state.deck.data.find( deck => deck.Id == Card.Deck.Id))

  console.log(Deck)

  const backRef = useRef();

  const [front, setFront] = useState(Card.Front);
  const [back, setBack] = useState(Card.Verse);


  function handleSubmit() {

    Card.Front = front
    Card.Verse = back

    update()
    Alert.alert(
      'Alerta',
      `Cartão atualizado com sucesso.`,
      [
        {
          text: 'Ok',
          onPress: () => {
            let cardEdit = { front, back }
            navigation.navigate('Card' , cardEdit );
          },
        },
      ],
      {cancelable: true},
    );
  }

  function update() {
    Deck.removeCard(Card)
    dispatch(updateCard({ card : Card}))
    dispatch(updateDeck(Deck))
  }

  function deleteCard() {

    Card.IsActive = false
    update()
  }

  function handleDelete() {
    Alert.alert(
      'Alerta',
      `Você tem certeza que quer excluir?`,
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'Cancelar',
        },
        {
          text: 'Sim',
          onPress: () => {
            deleteCard()
            let cardEdit = { front, back }
            navigation.navigate('Card' , cardEdit );
          },
        },
      ],
      {cancelable: true},
    );
  }

  function renderInput(placeholder, value, onChangeValue) {
    return (
      <S.FormInput
        icon="cards-outline"
        autoCorrect={false}
        autoCapitalize="none"
        placeholder={placeholder}
        returnKeyType="next"
        //onSubmitEditing={() => backRef.current.focus()}
        value={value}
        onChangeText={onChangeValue}
      />
    )
  }

  return (
    <>
      <S.Container>
        <S.Margin />
        <Form>

          { renderInput('Frente', front, setFront ) }

          { renderInput('Verso', back, setBack ) }

          <Separator />

          <S.ButtonTheme onPress={handleSubmit}>
            <S.TextButton>Salvar</S.TextButton>
          </S.ButtonTheme>
          <Spacing mt="10" />
          <S.ButtonTheme onPress={handleDelete}>
            <S.TextButton>Excluir</S.TextButton>
          </S.ButtonTheme>
        </Form>
      </S.Container>
    </>
  );
}

EditCard.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableOpacity
      style={{marginTop: 30}}
      onPress={() => {
        navigation.navigate('Card');
      }}>
      <IconMi name="arrow-back" size={30} color="#fff" />
    </TouchableOpacity>
  ),
});

EditCard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
