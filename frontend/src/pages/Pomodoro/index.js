import React, {useState} from 'react';
import * as S from '~/styles/global';
import {View} from 'react-native';
import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';
import * as Animatable from 'react-native-animatable';

import IconMi from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';
import {ButtonPomodoro, InputSetNumber} from './styles';

export default function Pomodoro({navigation}) {
  const [isSetting, setIsSetting] = useState(false);

  function handleSetting() {
    setIsSetting(!isSetting);
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

        <S.StyledContainer>
          {!isSetting && (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <S.Text size={80} weight="bold">
                25:00
              </S.Text>
            </View>
          )}
          {isSetting && (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <S.Text size={40} weight="bold">
                5:00
              </S.Text>
              <Spacing mt="30" />
              <S.Text size={40} weight="bold">
                25:00
              </S.Text>
              <Spacing mt="30" />
              <Typography
                onPress={() => handleSetting()}
                size="20"
                weight="bold"
                color="#fe650e">
                Fechar
              </Typography>
            </View>
          )}

          <S.ButtonContainer mb="50">
            <Animatable.View
              animation="fadeInUp"
              easing="ease-out-circ"
              direction="alternate">
              <ButtonPomodoro>
                <Typography color="#fff">
                  <IconMi name="play-arrow" size={25} color="#FFF" />
                </Typography>
              </ButtonPomodoro>
            </Animatable.View>
            <Animatable.View
              animation="fadeInUp"
              delay={30}
              easing="ease-out-circ"
              direction="normal">
              <ButtonPomodoro>
                <Typography color="#fff">
                  <IconMi name="pause" size={25} color="#FFF" />
                </Typography>
              </ButtonPomodoro>
            </Animatable.View>
            <Animatable.View
              animation="fadeInUp"
              delay={60}
              easing="ease-out-circ"
              direction="alternate">
              <ButtonPomodoro onPress={() => handleSetting()}>
                <Typography color="#fff">
                  <IconMi name="settings" size={25} color="#FFF" />
                </Typography>
              </ButtonPomodoro>
            </Animatable.View>
          </S.ButtonContainer>
        </S.StyledContainer>
      </S.Container>
    </>
  );
}
