
import firebase from 'firebase';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

export default class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'xxxxxxxxxxxxxxxxxx',
      authDomain: 'xxxxxxxxxxxxxxxxxx',
      databaseURL: 'xxxxxxxxxxxxxxxxxx',
      storageBucket: 'xxxxxxxxxxxxxxxxxx',
      messagingSenderId: 'xxxxxxxxxxxxxxxxxx'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Sair
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Autenticação THCM" />
        {this.renderContent()}
      </View>
    );
  }
}
