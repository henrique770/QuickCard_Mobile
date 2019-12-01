import React from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import BoxNotePad from '~/components/BoxNotePad';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions } from 'react-navigation-drawer';
import { Container, Title, List } from './styles';

const data = [1,2,3,4,5,6,7,8];

export default function NotePads({navigation}) {
  return (
      <Background>
      <Container>
      <View style={styles.header}>
       <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
       <Icon name="menu" size={30} color="#FFF" />
       </TouchableOpacity>
       </View>
        <Title>Blocos de anotações</Title>
        <List
          data={data}
          keyExtractor={item => String(item)}
          renderItem={({ item }) => <BoxNotePad data={item} />}
        />
      </Container>
      </Background>

  );
}
const styles = StyleSheet.create({
  header: {
    position: "absolute",
    right: 30,
    top: 30,
  }
});
