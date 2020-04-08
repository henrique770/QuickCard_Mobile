import React, {useState, useRef, useEffect} from 'react';
import * as S from '~/styles/global';
import {View} from 'react-native';
import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';

import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import {ButtonPomodoro} from './styles';
import animationBackground from '~/assets/timer-animation.json';
import Lottie from 'lottie-react-native';

import {useInterval} from '~/hooks/useInterval';

export default function Pomodoro({navigation}) {
  const [active, setActive] = useState(false);
  const [breakVal, setBreakVal] = useState(5);
  const [sessionVal, setSessionVal] = useState(25);
  const [mode, setMode] = useState('session');
  const [time, setTime] = useState(null);

  useInterval(() => setTime(time - 1000), active ? 1000 : null);

  useEffect(() => {
    setTime(sessionVal * 60 * 1000);
  }, [sessionVal]);

  useEffect(() => {
    if (time === 0 && mode === 'session') {
      setActive(false);
      setMode('break');
      setTime(breakVal * 60 * 1000);
    } else if (time === 0 && mode === 'break') {
      setActive(false);
      setMode('session');
      setTime(sessionVal * 60 * 1000);
    }
  }, [time, breakVal, sessionVal, mode]);

  const handleReset = () => {
    setActive(false);
    setMode('session');
    setBreakVal(5);
    setSessionVal(25);
    setTime(25 * 60 * 1000);
  };

  return (
    <>
      <S.Container>
        <Spacing position="absolute" top="18" right="30">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <IconMi name="menu" size={25} color="#FFF" />
          </TouchableOpacity>
        </Spacing>
        <S.Margin />

        <S.StyledContainer>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Lottie
              resizeMode="contain"
              source={animationBackground}
              autoPlay
              duration={1}
            />

            <Typography size={20} weight="bold" color="#fe650e">
              {mode === 'session' ? 'Sessão' : 'Pausa'}
            </Typography>
            <S.Text size={80} weight="bold">
              {moment(time).format('mm:ss')}
            </S.Text>
          </View>

          <S.ButtonContainer mb="50">
            <Animatable.View
              animation="fadeInUp"
              delay={30}
              easing="ease-out-circ"
              direction="normal">
              <ButtonPomodoro onPress={() => setActive(!active)}>
                <IconMi
                  name={active ? `pause` : `play-arrow`}
                  size={25}
                  color="#FFF"
                />
              </ButtonPomodoro>
            </Animatable.View>
            <Animatable.View
              animation="fadeInUp"
              delay={60}
              easing="ease-out-circ"
              direction="alternate">
              <ButtonPomodoro onPress={() => handleReset()}>
                <IconMc name="reload" size={25} color="#FFF" />
              </ButtonPomodoro>
            </Animatable.View>
          </S.ButtonContainer>
        </S.StyledContainer>
      </S.Container>
    </>
  );
}
