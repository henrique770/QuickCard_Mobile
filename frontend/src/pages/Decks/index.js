import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionButton from 'react-native-action-button';
import {TouchableOpacity, Alert} from 'react-native';
import Empty from '~/components/Empty';
import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';
import {withTheme} from 'styled-components';
import * as S from '~/styles/global';
import {updateDeck, getDecks} from '~/store/modules/deck/actions';
import {Messenger} from '~constants/ConstantsBusiness';

const Text = Typography;

function Decks({navigation, ...props}) {
  const dispatch = useDispatch();
  const decks = useSelector(state => state.deck.data);

  dispatch(getDecks());

  useEffect(() => {}, []);

  //#region UI LOGIC

  function deleteDeck(deck) {
    deck.IsActive = false;
    dispatch(updateDeck(deck));
  }

  function alertDeleteDeck(deck) {
    Alert.alert(
      Messenger.MSG000,
      Messenger.MSG017,
      [
        {
          // no
          text: Messenger.MSG027,
          onPress: () => {},
          style: 'Cancelar',
        },
        {
          // yes
          text: Messenger.MSG026,
          onPress: () => deleteDeck(deck),
        },
      ],
      {cancelable: true},
    );
  }

  //#endregion

  //#region UI COMPONENTS

  function renderAction(title, icon, navigate) {
    return (
      <ActionButton.Item
        buttonColor="#333"
        title={title}
        textContainerStyle={{
          height: 25,
        }}
        textStyle={{
          fontSize: 13,
        }}
        onPress={() => navigation.navigate(navigate)}>
        <IconMc name={icon} size={30} color="#FFF" />
      </ActionButton.Item>
    );
  }

  function renderActionButton() {
    return (
      <>
        <ActionButton buttonColor={props.theme.floatButton}>
          {renderAction('Adicionar Cartão', 'cards-outline', 'AddCard')}

          {renderAction('Adicionar Baralho', 'cards', 'AddDeck')}
        </ActionButton>
      </>
    );
  }

  function renderTextCard(firstText, secondText) {
    return (
      <Text color="#656565" size="14">
        {firstText}:{' '}
        <Text color="#f93b10" weight="bold">
          {secondText}
        </Text>
      </Text>
    );
  }

  function renderBodyCard(deck) {
    return (
      <S.Box data={deck} heightFixed>
        <S.Text weight="bold" size="16" maxHeight="60">
          {deck.Name}
        </S.Text>

        <Spacing mt="4" position="absolute" bottom={20} left={20}>
          {renderTextCard('Cartões', deck.totalCards())}

          {renderTextCard('A revisar', deck.totalUnreviewedCards())}

          {renderTextCard('Revisados', deck.totalCardsReviewed())}
        </Spacing>
      </S.Box>
    );
  }

  function renderListCard() {
    return (
      <S.List
        data={decks}
        numColumns={2}
        keyExtractor={item => String(item.Id)}
        renderItem={({item: deck}) => (
          <S.Container>
            <TouchableOpacity
              onPress={() => navigation.navigate('Card', {Deck: deck})}
              onLongPress={() => alertDeleteDeck(deck)}>
              {renderBodyCard(deck)}
            </TouchableOpacity>
          </S.Container>
        )}
      />
    );
  }

  //#endregion

  return (
    <>
      <S.Container>
        <Spacing position="absolute" top="18" right="30">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <IconMi name="menu" size={25} color="#FFF" />
          </TouchableOpacity>
        </Spacing>
        <S.Margin />

        {decks.length === 0 ? <Empty /> : renderListCard()}
      </S.Container>

      {renderActionButton()}
    </>
  );
}

export default withTheme(Decks);
