import React, { Fragment } from 'react';
import RedirectLoggedin from '../RedirectLoggedin';
import { firebase } from '../../App';
import { Link } from 'react-router-dom';

const Login = () => {
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      switch (e.code) {
        case 'auth/user-disabled':
          return alert('指定したユーザーは無効です');
        case 'auth/user-not-found':
          return alert('そのようなユーザーは存在しません');
        case 'auth/wrong-password':
          return alert('パスワードが間違っています');
        default:
          return alert('不明なエラーです');
      }
    }
    
  };

  return (
    <Fragment>
      <RedirectLoggedin to='/mypage' />
      <h2>Login</h2>
      <form onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type='email' name='email' />

        <label>Password</label>
        <input type='password' name='password' />

        <button type='submit'>Login</button>
      </form>
      <Link to='/'>Back to top</Link>
    </Fragment>
  );
}

export default Login;