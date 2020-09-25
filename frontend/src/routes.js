import React, {useState, useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import { firstAccess } from '~/store/modules/auth/actions';

import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Intro from '~/components/Intro';
import Dashboard from './pages/Dashboard';


import AddDeck from './pages/Decks/AddDeck';
import AddCard from './pages/Decks/AddCard';
import AddNote from './pages/Dashboard/AddNote';
import AddNotePad from './pages/Dashboard/AddNotePad';

import Decks from './pages/Decks';
import Note from './pages/Dashboard/Note';
import NotePad from './pages/Dashboard/NotePad';
import NotePadNotes from './pages/Dashboard/NotePadNotes';
import Card from './pages/Decks/Card';

import EditCard from './pages/Decks/EditCard';
import EditNotePad from "./pages/Dashboard/EditNotePad";

import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';

import PieChart from './pages/Charts';
import Profile from './pages/Profile';
import Pomodoro from './pages/Pomodoro';

import CustomDrawerContent from '~/components/CustomDrawerContent';
import {getDecks} from "~/store/modules/deck/actions";

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
        name="Note"
        component={Note}
        options={{
          title: '',
          headerTintColor: '#f93b10',
        }}
      />

      <Stack.Screen
        name="AddNote"
        component={AddNote}
        options={{
          title: '',
          headerTintColor: '#f93b10',
        }}
      />

      <Stack.Screen
        name="EditNotePad"
        component={EditNotePad}
        options={{
          title: 'Editar Bloco Notas',
          headerTintColor: '#ffffff',
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
        headerTitleStyle: {
          maxWidth: 250,
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
      <Stack.Screen
        name="Pomodoro"
        component={Pomodoro}
        options={{
          title: 'Pomodoro',
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

function StackNotePad() {
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
        name="NotePad"
        component={NotePad}
        options={{
          title: 'Blocos de notas',
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="NotePadNotes"
        component={NotePadNotes}
        options={{
          title: 'Anotações do bloco',
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="AddNotePad"
        component={AddNotePad}
        options={{
          title: 'Adicionar Bloco de notas',
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="AddNote"
        component={AddNote}
        options={{
          title: '',
          headerTintColor: '#f93b10',
        }}
      />
      <Stack.Screen
        name="Note"
        component={Note}
        options={{
          title: '',
          headerTintColor: '#f93b10',
        }}
      />

      <Stack.Screen
        name="EditNotePad"
        component={EditNotePad}
        options={{
          title: 'Editar Bloco Anotação',
          headerTintColor: '#f93b10',
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

function StackPomodoro() {
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
        name="Pomodoro"
        component={Pomodoro}
        options={{
          title: 'Pomodoro',
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

export default function createRouter(isSigned = false, isConnected = false) {

  const dispatch = useDispatch();
  const [ isFirstAccess, setFirstAccess] = useState(useSelector( state => state.auth.firstAccess));

    let renderProfile = () => {
      if (!isSigned)
        return <></>

      return (
        <Drawer.Screen
          name="Perfil"
          options={{
            drawerIcon: () => (
              <Icon color={'#fe650e'} size={20} name={'user-circle-o'}/>
            ),
          }}
          component={StackProfile}
        />)
    }

      , renderCreateProfile = () => {

      if (isSigned && !isConnected) {
        return <></>
      }

      return <>
        <Drawer.Screen
          name="Criar perfil"
          options={{
            drawerIcon: () => (
              <Icon color={'#fe650e'} size={20} name={'user-circle-o'}/>
            ),
          }}
          component={SignUp}
        />
      </>
    }

    return !isSigned ? (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
      </Stack.Navigator>
    ) : ( <>
        {isFirstAccess ? (
          <Intro onDone={() => {
              dispatch(firstAccess());
              setFirstAccess(false);
            }
          }/>
        ) : (
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
                  <IconMc color={'#fe650e'} size={20} name={'cards'}/>
                ),
              }}
              component={StackDecks}
            />
            <Drawer.Screen
              name="Todas as notas"
              options={{
                drawerIcon: () => (
                  <IconMc color={'#fe650e'} size={20} name={'file'}/>
                ),
              }}
              component={StackNotes}
            />
            <Drawer.Screen
              name="Blocos de notas"
              options={{
                drawerIcon: () => (
                  <IconMc color={'#fe650e'} size={20} name={'book-multiple'}/>
                ),
              }}
              component={StackNotePad}
            />

            <Drawer.Screen
              name="Pomodoro"
              options={{
                drawerIcon: () => (
                  <IconMc color={'#fe650e'} size={20} name={'timer'}/>
                ),
              }}
              component={StackPomodoro}
            />

            <Drawer.Screen
              name="Estatísticas"
              options={{
                drawerIcon: () => (
                  <IconMc color={'#fe650e'} size={20} name={'chart-bar'}/>
                ),
              }}
              component={StackCharts}
            />

            {renderProfile()}
            {renderCreateProfile()}

            {/*
        <Drawer.Screen
          name="Perfil"
          options={{
            drawerIcon: () => (
              <Icon color={'#fe650e'} size={20} name={'user-circle-o'} />
            ),
          }}
          component={StackProfile}
        />
        */}
          </Drawer.Navigator>
        )}
      </>
    )
  }
