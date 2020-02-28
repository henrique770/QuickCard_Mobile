import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, Title, ContainerTag, TagInput} from './styles';

export default function Annotation({navigation}) {
  return (
    <>
      <Container>
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
      </Container>
      <Container>
        <Title>Anotação</Title>
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
