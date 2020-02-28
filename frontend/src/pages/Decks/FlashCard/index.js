import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Background from '~/components/Background';
import {Title} from './styles';
import IconMi from 'react-native-vector-icons/MaterialIcons';

export default class FlashCard extends Component {
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
        {/* back */}
        <View style={styles.back_icon}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Decks')}>
            <IconMi name="arrow-back" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
        {/* edit */}
        <View style={styles.edit_icon}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('EditCard')}>
            <IconMi name="settings" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Title>FlashCard</Title>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.flipCard()}>
            <View>
              <Animated.View
                style={[
                  styles.flipCard,
                  frontAnimatedStyle,
                  {opacity: this.frontOpacity},
                ]}>
                <Text style={styles.flipText}>
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
                <Text style={styles.flipText}>
                  Um elemento da interface do usuário que é responsável por
                  exibir textos
                </Text>
              </Animated.View>
            </View>
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
    justifyContent: 'center',
  },
  flipCard: {
    width: 300,
    height: 400,
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
  flipText: {
    width: 200,
    textAlign: 'center',
    fontSize: 30,
    color: '#333',
    fontWeight: 'bold',
  },
  back_icon: {
    position: 'absolute',
    left: 30,
    top: 30,
  },
  edit_icon: {
    position: 'absolute',
    right: 30,
    top: 30,
  },
});

AppRegistry.registerComponent('FlashCard', () => FlashCard);
