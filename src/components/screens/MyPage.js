import React, { Fragment } from 'react';
import { UserContext, firebase } from '../../App';
import { Link } from 'react-router-dom';

const MyPage = () => {
  const signOutHandler = () => {
    firebase.auth().signOut();
  }

  return (
    <Fragment>
      <h2>My page</h2>
      <p>This is your information.</p>
      <UserContext.Consumer>
        {user => (
          <p>{JSON.stringify(user)}</p>
        )}
      </UserContext.Consumer>
      <p onClick={signOutHandler}>Sign out</p>
      <Link to='/'>Back to top</Link>
    </Fragment>
  );
};

export default MyPage;