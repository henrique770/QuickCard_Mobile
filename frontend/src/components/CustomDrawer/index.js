import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

import Typography from '~/components/Typography';
import Spacing from '~/components/Spacing';
import * as S from './styles';
import {DrawerNavigatorItems} from 'react-navigation-drawer';

export default function CustomDrawer({navigation, ...props}) {
  return (
    <View>
      <Image
        style={{width: 'auto', height: 150}}
        source={require('~/assets/background-sidebar.jpg')}
      />
      <S.Container>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Image
            style={{width: 58, height: 58, borderRadius: 58 / 2}}
            source={require('~/assets/profile.png')}
          />
        </TouchableOpacity>
        <Spacing mt="15" />
        <Typography weight="bold" color="#fff">
          Henrique Araújo
        </Typography>
        <Spacing mt="5" />
        <Typography color="#fff" size="12">
          henrique.1360@gmail.com
        </Typography>
      </S.Container>
      <DrawerNavigatorItems {...props} />
    </View>
  );
}
