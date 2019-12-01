import React from 'react';
import { signOut } from '~/store/modules/auth/actions';
// import { Container } from './styles';

export default function Logout() {
  return (
    signOut()
  );
}
