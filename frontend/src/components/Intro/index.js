import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, View, Image, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';

import Typography from '~/components/Typography';

const Text = Typography;
const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    paddingTop: 70,
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 100,
  },
  image: {},
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  title: {
    fontSize: 50,
    color: 'white',
    textAlign: 'center',
  },
});

const data = [
  {
    title: 'Bem vindo ao QuickCard!',
    text:
      'QuickCard É uma ferramenta que oferece muitos recursos, destinados a fazer com que as pessoas possam se organizar de forma eficaz!!',
    image: require('../../assets/studyImage.png'),
    bg: ['#fc4a1a', '#9d1b65'],
  },
  {
    title: 'FlashCards!',
    text:
      'Aproveite o recurso de flashcards e treine sua memorização para ficar com as respostas na ponta da língua!!',
    image: require('../../assets/flashcards.png'),
    bg: ['#667eea', '#764ba2'],
  },
  {
    title: 'Pomodoro!',
    text:
      'Aproveite o recurso de pomodoro e utilize o método de repetição espaçada para estudos mais eficiêntes!!',
    image: require('../../assets/timer.png'),
    bg: ['#43cea2', '#185a9d'],
  },
  {
    title: 'Anotações!',
    text:
      'Aproveite o recurso de anotações e anote trechos que poderão servir como perguntas e respostas dos cartões de memória!!',
    image: require('../../assets/notes.png'),
    bg: ['#24C6DC', '#514A9D'],
  },
];

export default function Intro({onDone}) {
  const renderItem = ({item}) => {
    return (
      <LinearGradient
        colors={item.bg}
        style={[
          styles.slide,
          {
            backgroundColor: item.bg,
          },
        ]}>
        <Text size={40} weight="bold" color="#fff">
          {item.title}
        </Text>

        <Image
          style={{width: 400, height: 80}}
          source={item.image}
          style={styles.image}
        />

        <Text size={17} color="#fff">
          {item.text}
        </Text>
      </LinearGradient>
    );
  };
  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  const renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };

  return (
    <>
      <StatusBar hidden />
      <AppIntroSlider
        data={data}
        renderItem={renderItem}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        onDone={onDone}
      />
    </>
  );
}
