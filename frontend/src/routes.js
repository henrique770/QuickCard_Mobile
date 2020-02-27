import React from 'react';
import {YellowBox, StyleSheet, Dimensions} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconF from 'react-native-vector-icons/MaterialCommunityIcons';

import Dashboard from './pages/Dashboard';
import NotePads from './pages/Dashboard/NotePads';
import Notes from './pages/Dashboard/Notes';

import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';

import Decks from './pages/Decks';
import AddDeck from './pages/Decks/AddDeck';
import FlashCard from './pages/Decks/FlashCard';
import AddCard from './pages/Decks/AddCard';
import EditCard from './pages/Decks/EditCard';

import Profile from './pages/Profile';
import Logout from './pages/Logout';

Icon.loadFont();
export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createSwitchNavigator({
          New: createDrawerNavigator(
            {
              Notas: {
                screen: Dashboard,
                navigationOptions: () => ({
                  drawerIcon: (
                    <Icon name="file-text" size={20} color="#f93b10" />
                  ),
                }),
              },
              Cadernos: {
                screen: NotePads,
                navigationOptions: () => ({
                  drawerIcon: (
                    <Icon
                      style={styles.backicon}
                      name="book"
                      size={20}
                      color="#f93b10"
                    />
                  ),
                }),
              },
              Baralhos: {
                screen: Decks,
                navigationOptions: () => ({
                  drawerIcon: (
                    <IconF name="cards-outline" size={20} color="#f93b10" />
                  ),
                }),
              },

              Perfil: {
                screen: Profile,
                navigationOptions: () => ({
                  drawerIcon: <Icon name="user" size={20} color="#f93b10" />,
                }),
              },
              Logout: {
                screen: Logout,
                navigationOptions: () => ({
                  drawerIcon: (
                    <Icon name="sign-out" size={20} color="#f93b10" />
                  ),
                }),
              },
            },

            {
              drawerWidth: Dimensions.get('window').width * 0.65,
              // hideStatusBar: true,
              drawerPosition: 'left',
              drawerBackgroundColor: '#fff',
              disableOpenGesture: true,
              contentOptions: {
                inactiveTintColor: '#333',
                activeBackgroundColor: '#f4f4f4',
                activeTintColor: '#333',
                itemsContainerStyle: {
                  marginTop: 33,
                  marginHorizontal: 8,
                },
                itemStyle: {
                  borderRadius: 4,
                },
              },
            },
          ),
          Decks,
          AddCard,
          AddDeck,
          FlashCard,
          EditCard,
          Notes,
          Dashboard,
        }),
      },

      {
        initialRouteName: isSigned ? 'App' : 'Sign',
        drawerWidth: 300,
        drawerPosition: 'left',
      },
    ),
  );

const styles = StyleSheet.create({
  backicon: {},
});
