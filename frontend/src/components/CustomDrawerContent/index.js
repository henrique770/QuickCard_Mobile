import React, {useEffect, useState} from 'react';
import {View, Image, Button, Switch} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import IconIo from 'react-native-vector-icons/Ionicons';

import {useTheme} from '~/components/ThemeContext';

import {withTheme} from 'styled-components';

import * as S from './styles';
import * as G from '~/styles/global';
import StudentEntity from "~/entities/StudentEntity";

function CustomDrawerContent({...props}) {

  const themeToggle = useTheme();
  const auth = useSelector((state) => state.auth)
  const profile = new StudentEntity(auth.profile)
  const [check, setCheck] = useState(false);

  function toogleSwitch() {
    themeToggle.toggleTheme();
    setCheck(!check);
  }

  return (
    <G.Sidebar>
      <Spacing mb="20">
        <View>
          <Image
            style={{width: 'auto', height: 140}}
            source={require('~/assets/background-sidebar.jpg')}
          />
          <S.Container>
            <Image
              style={{width: 58, height: 58, borderRadius: 58 / 2}}
              source={profile.ImgProfile}
            />

            <Spacing mt="15" />
            <Typography weight="bold" color="#fff">
              {profile.Name}
            </Typography>
            <Spacing mt="5" />
            <Typography color="#fff" size="12">
              {profile.Email}
            </Typography>
          </S.Container>
        </View>
      </Spacing>
      <DrawerContentScrollView {...props}>
        <DrawerItemList
          activeTintColor={props.theme.primaryText}
          inactiveTintColor={props.theme.primaryText}
          labelStyle={{
            fontWeight: 'bold',
          }}
          navigation
          {...props}
        />
        <Spacing
          ds="flex"
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <DrawerItem
            icon={({size}) => (
              <IconIo color="#fe650e" size={size} name={'ios-moon'} />
            )}
            labelStyle={{
              color: props.theme.primaryText,
              fontWeight: 'bold',
            }}
            label="Tema Escuro"
          />
          <Switch
            thumbColor="#424242"
            trackColor="#292929"
            value={check}
            onValueChange={toogleSwitch}
          />
        </Spacing>
      </DrawerContentScrollView>
    </G.Sidebar>
  );
}

export default withTheme(CustomDrawerContent);
