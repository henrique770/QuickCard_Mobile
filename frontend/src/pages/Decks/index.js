import React, { useState, useEffect } from 'react';
import Background from '~/components/Background';
import BoxDeck from '~/components/BoxDeck';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { Container, Title, List } from './styles';
// import api from '~/services/api';


const data = [1,2,3,4,5,6,7,8];

export default function Dashboard({ navigation }) {
  // const [data, setData] = useState([1,2,3,4,5,6,7,8]);
  // let tokenStr = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGIyZDMwNDkyYjY5MTk2MDZiMGQxZiIsImlhdCI6MTU3NDY0NjI1NywiZXhwIjoxNTc0NzMyNjU3fQ.nvAnHLMn3Z4dXRWbn86o2c5JIOJJasDN1r7mPoGzOkc';
  // let getMyDecks = async => {
  //   return api.get('/blococartao', { headers: {"Authorization" : `Bearer ${tokenStr}`} })
  // }
  // useEffect(() => {
  //   const getDataDecks = async () => {
  //     let data = await getMyDecks()

  //     if(data == null)
  //     {
  //       return;
  //     }
  //     setData(data)
  //   }

  //   getDataDecks()
  // }, [])

  return (
      <Background>
      <Container>
      {/* add card */}
      <View style={styles.header_add_card}>
       <TouchableOpacity onPress={() => navigation.navigate('AddCard')}>
       <IconF name="cards" size={30} color="#FFF" />
       </TouchableOpacity>
       </View>
      {/* add deck */}
      <View style={styles.header_add}>
       <TouchableOpacity onPress={() => navigation.navigate('AddDeck')}>
       <IconF name="plus" size={30} color="#FFF" />
       </TouchableOpacity>
       </View>
      {/* menu */}
      <View style={styles.header}>
       <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
       <Icon name="menu" size={30} color="#FFF" />
       </TouchableOpacity>
       </View>

        <Title>Baralhos</Title>


        <List
          data={data}
          keyExtractor={item => String(item)}
          renderItem={({ item }) =>
          <TouchableOpacity onPress={() => navigation.navigate('FlashCard')}>
          <BoxDeck data={item} />
          </TouchableOpacity>
          }
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
  },
  header_add_card: {
    position: "absolute",
    left: 30,
    top: 30,
  }

});
