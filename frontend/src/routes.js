import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Dashboard from './pages/Annotation/_Dashboard';
import AddNotes from './pages/Annotation/_AddNotes';

import NoteBlocks from './pages/Annotation/NoteBlocks';
import AddBlocks from './pages/Annotation/AddBlocks';
import Blocks from './pages/Annotation/Blocks';
import AddBlockNotes from './pages/Annotation/AddBlockNotes';

import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';

import Decks from './pages/Decks';
import AddDeck from './pages/Decks/AddDeck';
import Card from './pages/Decks/Card';
import AddCard from './pages/Decks/AddCard';
import EditCard from './pages/Decks/EditCard';

import PieChart from './pages/Charts/PieChart';

import Profile from './pages/Profile';

import CustomDrawerContent from '~/components/CustomDrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

function StackNotes() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      headerMode="screen"
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#fff',
        headerLeftContainerStyle: {
          marginLeft: 5,
        },
      }}>
      <Stack.Screen
        name="Dashboard"
        options={{title: 'Todas as notas'}}
        component={Dashboard}
      />

      <Stack.Screen
        name="AddNotes"
        component={AddNotes}
        options={{
          title: '',
          headerTintColor: '#f93b10',
        }}
      />
    </Stack.Navigator>
  );
}

function StackDecks() {
  return (
    <Stack.Navigator
      initialRouteName="Decks"
      headerMode="screen"
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#fff',
        headerLeftContainerStyle: {
          marginLeft: 10,
        },
      }}>
      <Stack.Screen
        name="Decks"
        options={{title: 'Baralhos'}}
        component={Decks}
      />
      <Stack.Screen
        name="AddDeck"
        component={AddDeck}
        options={{
          title: 'Adicionar Baralho',
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCard}
        options={{
          title: 'Adicionar Cartão',
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="Card"
        component={Card}
        options={{
          title: 'Cartão',
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="EditCard"
        component={EditCard}
        options={{
          title: 'Editar Cartão',
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

function StackNoteBlocks() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#fff',
        headerLeftContainerStyle: {
          marginLeft: 10,
        },
      }}>
      <Stack.Screen
        name="NoteBlocks"
        component={NoteBlocks}
        options={{
          title: 'Blocos de notas',
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="Blocks"
        component={Blocks}
        options={{
          title: 'Anotações do bloco',
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="AddBlocks"
        component={AddBlocks}
        options={{
          title: 'Adicionar Bloco de notas',
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="AddBlockNotes"
        component={AddBlockNotes}
        options={{
          title: '',
          headerTintColor: '#f93b10',
        }}
      />
    </Stack.Navigator>
  );
}

function StackProfile() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#fff',
        headerLeftContainerStyle: {
          marginLeft: 10,
        },
      }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Meu perfil',
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

function StackCharts() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#fe650e',
        headerLeftContainerStyle: {
          marginLeft: 10,
        },
      }}>
      <Tab.Screen
        name="PieChart"
        component={PieChart}
        options={{
          title: 'Estatísticas',
        }}
      />
    </Stack.Navigator>
  );
}

export default function createRouter(isSigned = false) {
  return !isSigned ? (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  ) : (
    <>
      <Drawer.Navigator
        drawerStyle={{
          backgroundColor: '#fff',
          width: 301,
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Baralhos"
          options={{
            drawerIcon: () => (
              <IconMc color={'#fe650e'} size={20} name={'cards'} />
            ),
          }}
          component={StackDecks}
        />
        <Drawer.Screen
          name="Todas as notas"
          options={{
            drawerIcon: () => (
              <IconMc color={'#fe650e'} size={20} name={'file'} />
            ),
          }}
          component={StackNotes}
        />
        <Drawer.Screen
          name="Blocos de notas"
          options={{
            drawerIcon: () => (
              <IconMc color={'#fe650e'} size={20} name={'book-multiple'} />
            ),
          }}
          component={StackNoteBlocks}
        />

        <Drawer.Screen
          name="Estatísticas"
          options={{
            drawerIcon: () => (
              <IconMc color={'#fe650e'} size={20} name={'chart-bar'} />
            ),
          }}
          component={StackCharts}
        />
        <Drawer.Screen
          name="Perfil"
          options={{
            drawerIcon: () => (
              <Icon color={'#fe650e'} size={20} name={'user-circle-o'} />
            ),
          }}
          component={StackProfile}
        />
      </Drawer.Navigator>
    </>
  );
}
