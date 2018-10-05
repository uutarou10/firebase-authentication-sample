import React, { Fragment } from 'react';
import RedirectLoggedin from '../RedirectLoggedin';
import { firebase } from '../../App';
import { Link } from 'react-router-dom';

const Register = () => {
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try{
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch(e) {
      switch(e.code) {
        case 'auth/email-already-in-use':
          return alert('そのアドレスは既に使用されています');
        case 'auth/weak-password':
          return alert('強固なパスワードを使用してください');
        default:
          return alert('不明なエラーです');
      }
    }
  }

  return (
    <Fragment>
      <RedirectLoggedin to='/mypage' />
      <h2>Register</h2>
      <form onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type='email' name='email' />

        <label>Password</label>
        <input type='password' name='password' />

        <button type='submit'>Register</button>
      </form>
      <Link to='/'>Back to top</Link>
    </Fragment>
  );
}

export default Register;