import React from 'react';
import Background from '~/components/Background';
import Notes from '~/components/Notes';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Title, List } from './styles';
import { DrawerActions } from 'react-navigation-drawer';

const data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];

export default function Dashboard({navigation}) {

  return (
      <Background>
      <Container>

      <View style={styles.header_add}>
       <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
       <IconF name="plus" size={30} color="#FFF" />
       </TouchableOpacity>
       </View>

       <View style={styles.header}>
       <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
       <Icon name="menu" size={30} color="#FFF" />
       </TouchableOpacity>
       </View>

       <Title>Notas</Title>
       <List
          data={data}
          keyExtractor={item => String(item)}
          renderItem={({ item }) => <Notes data={item} />}
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
  },
  header_add: {
    position: "absolute",
    right: 90,
    top: 30,
  }
});
