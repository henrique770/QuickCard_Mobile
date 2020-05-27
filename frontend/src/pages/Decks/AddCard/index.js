import React, {useRef, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as S from '~/styles/global';
import {TouchableOpacity, Alert} from 'react-native';
import { View, Picker, StyleSheet } from "react-native";

import { store } from '~/store'

import { addCard , updateDeck } from '~/store/modules/deck/actions'

import {Title, Separator, Form} from './styles';
import Typography from '~/components/Typography';
const Text = Typography;



export default function AddCard({navigation, route}) {

  const decks = useSelector( state => state.deck.data )

  const filterActive = decks => {
    if(Array.isArray(decks)) {
      return decks.filter( deck => deck.IsActive )
    }
    return  []
  }

  const dispatch = useDispatch()
  const [selectedValue, setSelectedValue] = useState(undefined)
  const frontRef = useRef()
  const backRef = useRef()
  const [front, setFront] = useState('')
  const [verse, setVerse] = useState('')

  //#region UI LOGIC

  function handleSubmit(e) {

    if(selectedValue === undefined) {
      alert(`Selecione um baralho`)
      return
    }

    if(verse === "") {
      alert(`Digite a frente do cartão`)
      return
    }

    if(verse === "") {
      alert(`Digite o verso do cartão`)
      return
    }

    submitCard()
  }

  function submitCard() {
    dispatch(addCard({
      Verse : verse
      , Front : front
      , IdDeck : selectedValue
    }))

    let data = store.getState( state => state.Deck.data)
    console.log(data)

    alert(`Cartão adicionado com sucesso!`)

    setSelectedValue('')
    setFront('')
    setVerse('')
  }

  function alert(textAlert) {
    Alert.alert(
      'Alerta',
      textAlert,
      [
        {
          text: 'Ok',
        },
      ],
      {cancelable: true},
    )
  }

  //#endregion

  //#region UI COMPONENTS

  function renderOptionsDeck() {
    let dataOptions = filterActive(decks).map(deck => {
      return { id : deck.Id , name : deck.Name }
    })

    dataOptions.unshift({ id: undefined, name: 'Selecione uma baralho'})

    return dataOptions.map( option => {

      return <Picker.Item value={option.id} label={option.name} />
    })
  }

  function renderSelectDeck() {
    return (<>
      <Text color="#FFF" weight="bold">Deck:</Text>

      <Picker
        name="idDeck"
        selectedValue={selectedValue}
        style={{ height: 50, width: '100%' , color: '#fff'}}
        onValueChange={(itemValue , itemIndex) => {
          console.log('Item value : ',itemValue)
          setSelectedValue(itemValue)
        }}
      >
        { renderOptionsDeck() }
      </Picker>
    </>)
  }

  function renderInputFront() {
    return (
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
    )
  }

  function renderInputVerse() {
    return (
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
    )
  }

  function renderFormAddCard() {
    return (
      <Form>
        { renderSelectDeck() }

        { renderInputFront() }

        { renderInputVerse() }

        <Separator />

        <S.ButtonTheme onPress={handleSubmit}>
          <S.TextButton type='submit'>Salvar</S.TextButton>
        </S.ButtonTheme>
      </Form>
    )
  }

  //#endregion

  return (
    <>
      <S.Container>
        {/* <Spacing position="absolute" top="30" left="30">
          <TouchableOpacity onPress={() => navigation.navigate('Decks')}>
            <IconMi name="arrow-back" size={30} color="#FFF" />
          </TouchableOpacity>
        </Spacing> */}
        <S.Margin />

        { renderFormAddCard() }

      </S.Container>
    </>
  );
}
