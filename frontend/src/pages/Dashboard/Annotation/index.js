import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, Title, ContainerTag, TagInput, TextNote} from './styles';

export default function Annotation({navigation}) {
  return (
    <>
      <Container>
        <View style={{marginBottom: 40}}>
          <View style={styles.back_icon}>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
              <IconMi name="arrow-back" size={30} color="#f93b10" />
            </TouchableOpacity>
          </View>
          <View style={styles.tag}>
            <ContainerTag>
              <IconMc name="tag" size={20} color="#f93b10" />
              <TagInput
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Tag Baralho"
              />
            </ContainerTag>
          </View>
        </View>
        <View style={{padding: 16}}>
          <Title>Título</Title>

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

const styles = StyleSheet.create({
  back_icon: {
    position: 'absolute',
    left: 30,
    top: 30,
  },

  tag: {
    position: 'absolute',
    right: 30,
    width: '50%',
    top: 22,
  },
});
