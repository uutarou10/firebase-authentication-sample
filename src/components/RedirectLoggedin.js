import React from 'react';
import { Redirect } from 'react-router';
import { UserContext } from '../App';

const RedirectLoggedin = ({
  to
}) => {
  return (
    <UserContext.Consumer>
      {user => (
        user ? (
          <Redirect to={to} />
        ) : undefined
      )}
    </UserContext.Consumer>
  );
}

export default RedirectLoggedin;