import React from 'react';

import Spacing from '~/components/Spacing';
import {TouchableOpacity, View} from 'react-native';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, Title, ContainerTag, TagInput, TextNote} from './styles';

import * as S from '~/styles/global';

export default function Notes({navigation}) {
  return (
    <>
      <Container>
        <Spacing mb="40">
          <Spacing position="absolute" top="30" left="30">
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
              <IconMi name="arrow-back" size={30} color="#f93b10" />
            </TouchableOpacity>
          </Spacing>
          <Spacing position="absolute" top="22" right="30" width="50">
            <ContainerTag>
              <IconMc name="tag" size={20} color="#f93b10" />
              <TagInput
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Tag Baralho"
              />
            </ContainerTag>
          </Spacing>
        </Spacing>
        <View style={{padding: 16}}>
          <S.Title>Título</S.Title>

          <TextNote>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
            porro adipisci molestiae nemo quaerat nobis, alias eum voluptas
            modi, voluptates dicta deserunt at eaque incidunt hic, repudiandae
            iure odio cum. Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Pariatur porro adipisci molestiae nemo quaerat nobis, alias
            eum voluptas modi, voluptates dicta deserunt at eaque incidunt hic,
            repudiandae iure odio cum. modi, voluptates dicta deserunt at eaque
            incidunt hic, repudiandae iure odio cum. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Pariatur porro adipisci molestiae
            nemo quaerat nobis, alias eum voluptas modi, voluptates dicta
            deserunt at eaque incidunt hic, repudiandae iure odio cum.
          </TextNote>

          <TextNote>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
            porro adipisci molestiae nemo quaerat nobis, alias eum voluptas
            modi, voluptates dicta deserunt at eaque incidunt hic, repudiandae
            iure odio cum. Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Pariatur porro adipisci molestiae nemo quaerat nobis, alias
            eum voluptas modi, voluptates dicta deserunt at eaque incidunt hic,
            repudiandae iure odio cum.
          </TextNote>
        </View>
      </Container>
    </>
  );
}
