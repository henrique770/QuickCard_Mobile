import React, {Component} from 'react';

import Background from '~/components/Background';
import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';

import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';

import IconMi from 'react-native-vector-icons/MaterialIcons';
import * as S from '~/styles/global';

const Text = Typography;

export default class Card extends Component {
  UNSAFE_componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({value}) => {
      this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0],
    });
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1],
    });
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start();
    }
  }

  render() {
    const frontAnimatedStyle = {
      transform: [{rotateY: this.frontInterpolate}],
    };
    const backAnimatedStyle = {
      transform: [{rotateY: this.backInterpolate}],
    };

    return (
      <Background>
        <Spacing position="absolute" top="30" left="30">
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Decks')}>
            <IconMi name="arrow-back" size={30} color="#FFF" />
          </TouchableOpacity>
        </Spacing>

        <Spacing position="absolute" top="30" right="30">
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('EditCard')}>
            <IconMi name="settings" size={30} color="#FFF" />
          </TouchableOpacity>
        </Spacing>
        <S.Title>Card</S.Title>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.flipCard()}>
            <Animated.View
              style={[
                styles.flipCard,
                frontAnimatedStyle,
                {opacity: this.frontOpacity},
              ]}>
              <Text
                width="260"
                size="30"
                textAlign="center"
                weight="bold"
                overflow="hidden"
                maxHeight="250">
                Oque é o elemento "Text View"?
              </Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.flipCard,
                styles.flipCardBack,
                backAnimatedStyle,
                {opacity: this.backOpacity},
              ]}>
              <Text
                width="260"
                size="30"
                textAlign="center"
                weight="bold"
                overflow="hidden"
                maxHeight="250">
                Um elemento da interface do usuário que é responsável por exibir
                textos
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  flipCard: {
    width: 300,
    height: 400,
    marginTop: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
  },
});

AppRegistry.registerComponent('Card', () => Card);
