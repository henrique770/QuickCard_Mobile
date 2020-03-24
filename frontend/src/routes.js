import React from 'react';
import {
  YellowBox,
  Dimensions,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Dashboard from './pages/Dashboard';
import Notes from './pages/Dashboard/Notes';
import NotePads from './pages/Dashboard/NotePads';

import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';

import Decks from './pages/Decks';
import AddDeck from './pages/Decks/AddDeck';
import Card from './pages/Decks/Card';
import AddCard from './pages/Decks/AddCard';
import EditCard from './pages/Decks/EditCard';

import Charts from './pages/Charts';
import Profile from './pages/Profile';

import CustomDrawerContent from '~/components/CustomDrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
        name="Notes"
        component={Notes}
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

function StackNotepads() {
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
        name="NotePads"
        component={NotePads}
        options={{
          title: 'Cadernos',
          headerTintColor: '#fff',
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
        headerTintColor: '#fff',
        headerLeftContainerStyle: {
          marginLeft: 10,
        },
      }}>
      <Stack.Screen
        name="Charts"
        component={Charts}
        options={{
          title: 'Estatísticas',
          headerTintColor: '#f93b10',
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
          width: 300,
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Todas as notas"
          options={{
            drawerIcon: () => (
              <Icon color={'#fe650e'} size={20} name={'file-text'} />
            ),
          }}
          component={StackNotes}
        />
        <Drawer.Screen
          name="Bloco de notas"
          options={{
            drawerIcon: () => (
              <Icon color={'#fe650e'} size={20} name={'book'} />
            ),
          }}
          component={StackNotepads}
        />
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
          name="Estatísticas"
          options={{
            drawerIcon: () => (
              <Icon color={'#fe650e'} size={20} name={'pie-chart'} />
            ),
          }}
          component={StackCharts}
        />
        <Drawer.Screen
          name="Perfil"
          options={{
            drawerIcon: () => (
              <Icon color={'#fe650e'} size={20} name={'user'} />
            ),
          }}
          component={StackProfile}
        />
      </Drawer.Navigator>
    </>
  );
}
