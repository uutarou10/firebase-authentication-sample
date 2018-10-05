import React from 'react';
import { UserContext } from '../App';
import { Redirect } from 'react-router';

const Auth = ({children}) => {
  return (
    <UserContext.Consumer>
      {user => (
        user ? (
          children
        ) : (
          <Redirect to='/login' />
        )
      )}
    </UserContext.Consumer>
  );
}

export default Auth;