import React, {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';

import Spacing from '~/components/Spacing';
import * as S from '~/styles/global';

import {TouchableOpacity} from 'react-native';
import IconMi from 'react-native-vector-icons/MaterialIcons';

import { View, Picker, StyleSheet } from "react-native";

// import { updateProfileRequest } from '~/store/modules/user/actions';
import { addCard } from '~/store/modules/deck/actions'

import {Title, Separator, Form} from './styles';
import Typography from '~/components/Typography';
const Text = Typography;


export default function AddCard({navigation, route}) {

  const decks = useSelector( state => state.deck.data )
  const dispatch = useDispatch()
  const [selectedValue, setSelectedValue] = useState('')
  const frontRef = useRef()
  const backRef = useRef()
  const [front, setFront] = useState('')
  const [verse, setVerse] = useState('')

  function handleSubmit(e) {

    dispatch(addCard({
      Verse : verse
      , Front : front
      , IdDeck : selectedValue
    }))
  }

  let decksRegistre = decks.map(deck => {
    return <Picker.Item value={deck.Id} label={deck.Name} />
  })

  return (
    <>
      <S.Container>
        {/* <Spacing position="absolute" top="30" left="30">
          <TouchableOpacity onPress={() => navigation.navigate('Decks')}>
            <IconMi name="arrow-back" size={30} color="#FFF" />
          </TouchableOpacity>
        </Spacing> */}
        <S.Margin />

        <Form>
          <Text color="#FFF" weight="bold">Deck:</Text>
          <Picker
            name="idDeck"
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 , color: '#fff'}}
            onValueChange={(itemValue , itemIndex) => {
              console.log('Item value : ',itemValue)
              setSelectedValue(itemValue)
            }}
          >
            {decksRegistre}
          </Picker>
            {/*
            <S.FormInput
              icon="cards"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Baralho"
              returnKeyType="next"
              onSubmitEditing={() => frontRef.current.focus()}
              value={}
              onChangeText={}
            />
            */}
            <S.FormInput
              name="front"
              icon="cards-outline"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Frente"
              ref={frontRef}
              returnKeyType="next"
              onSubmitEditing={() => backRef.current.focus()}
              value={front}
              onChangeText={setFront}
            />

            <S.FormInput
              name="verse"
              icon="cards-playing-outline"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Verso"
              ref={backRef}
              returnKeyType="next"
              value={verse}
              onChangeText={setVerse}
            />

            <Separator />

            <S.ButtonTheme onPress={handleSubmit}>
              <S.TextButton type='submit'>Salvar</S.TextButton>
            </S.ButtonTheme>
        </Form>
      </S.Container>
    </>
  );
}
