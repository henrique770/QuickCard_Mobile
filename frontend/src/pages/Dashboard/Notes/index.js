import React from 'react';

import Spacing from '~/components/Spacing';
import {TouchableOpacity} from 'react-native';
// import WebView from 'react-native-webview';

import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, Title, ContainerTag, TagInput, TextNote} from './styles';


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




          <Spacing ml="20" mr="20">
          <Title>Título</Title>


          <TextNote >
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
          </Spacing>

      </Container>
    </>
  );
}
