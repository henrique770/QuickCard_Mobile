import React from 'react';
import {View, Image} from 'react-native';

import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {withTheme} from 'styled-components';

import * as S from './styles';
import * as G from '~/styles/global';

function CustomDrawerContent(props) {
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
        <DrawerItemList {...props} />
        {/* <DrawerItem label="Help" onPress={() => alert('Link to help')} /> */}
      </DrawerContentScrollView>
    </G.Sidebar>
  );
}

export default withTheme(CustomDrawerContent);
