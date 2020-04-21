import React, {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';

import Spacing from '~/components/Spacing';
import * as S from '~/styles/global';

import {TouchableOpacity} from 'react-native';
import IconMi from 'react-native-vector-icons/MaterialIcons';

import { View, Picker, StyleSheet } from "react-native";

// import { updateProfileRequest } from '~/store/modules/user/actions';

import {Title, Separator, Form} from './styles';


export default function AddCard({navigation, route}) {

  const decks = route.params
   , [selectedValue, setSelectedValue] = useState((()=>{

      if(Array.isArray(decks))
      {
        return decks[0]._id
      }

      return ''
    })())
   , frontRef = useRef()
   , backRef = useRef()
   , [front, setFront] = useState('')
   , [verse, setVerse] = useState('')


  async function handleSubmit(e) {
     
  }

  let decksRegistre = decks.map(deck => {
    return <Picker.Item value={deck._id} label={deck.name} />
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

        <Picker
          name="idDeck"
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 , color: '#fff'}}
          onValueChange={(e) => {
            console.log(e)
            setSelectedValue(e)
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
