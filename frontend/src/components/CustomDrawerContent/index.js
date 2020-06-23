import React, {useState} from 'react';
import {View, Image, Button, Switch} from 'react-native';

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

function CustomDrawerContent({...props}) {
  const themeToggle = useTheme();

  const [check, setCheck] = useState(true);

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
              source={require('~/assets/profile.png')}
            />

            <Spacing mt="15" />
            <Typography weight="bold" color="#fff">
              Henrique Araújo
            </Typography>
            <Spacing mt="5" />
            <Typography color="#fff" size="12">
              henrique.1360@gmail.com
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
          {/* <Button onPress={toogleSwitch} title="Button" /> */}
        </Spacing>
      </DrawerContentScrollView>
    </G.Sidebar>
  );
}

export default withTheme(CustomDrawerContent);
