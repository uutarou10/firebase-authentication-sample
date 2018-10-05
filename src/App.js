import React, { Component, createContext } from 'react';
import fb from 'firebase/app';
import 'firebase/auth';
import { BrowserRouter, Link } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import MyPage from './components/screens/MyPage';
import Register from './components/screens/Register';
import Login from './components/screens/Login';
import Auth from './components/Auth';

export const firebase = fb.initializeApp({
  apiKey: "AIzaSyA29sS4CnngISvA4BVkW7MB5CJduMWYJbA",
  authDomain: "auth-sample-c299a.firebaseapp.com",
  databaseURL: "https://auth-sample-c299a.firebaseio.com",
  projectId: "auth-sample-c299a",
  storageBucket: "auth-sample-c299a.appspot.com",
  messagingSenderId: "328698382048"
});

export const UserContext = createContext(undefined);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      loading: true
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // set user to state when logged in.
        this.setState({
          user,
          loading: false
        });
      } else {
        // unset user to state when logged out.
        this.setState({
          user: undefined,
          loading: false
        });
      }
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <p>Loading...</p>
      )
    } else {
      return (
        <BrowserRouter>
          <UserContext.Provider value={this.state.user}>
            <Route path='/'>
              <h1>Firebase Authentication<br />Test Application</h1>
            </Route>
            <Switch>
              <Route exact path='/'>
                <ul>
                  <li><Link to='/mypage'>My page(Require login)</Link></li>
                  <li><Link to='/login'>Login</Link></li>
                  <li><Link to='/register'>Register</Link></li>
                </ul>
              </Route>
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
              <Auth>
                <Route
                  path='/mypage'
                  render={() => <MyPage user={this.state.user} />}
                />
              </Auth>
            </Switch>
          </UserContext.Provider>
        </BrowserRouter>
      );
    }
  }
}

export default App;
