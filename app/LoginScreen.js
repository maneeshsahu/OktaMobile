/*
 * Copyright (c) 2019, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React from 'react';
import {
  SafeAreaView,
  // Button,
  StyleSheet,
  Image,
  Text,
  View,
  StatusBar,
  // TextInput,
} from 'react-native';
import {Button, TextInput, HelperText} from 'react-native-paper';
import {
  signIn,
  signOut,
  getAccessToken,
  isAuthenticated,
  EventEmitter,
} from '@okta/okta-react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      context: null,
      username: '',
      password: '',
      progress: false,
      error: '',
    };

    this.login = this.login.bind(this);
    this.federatedLogin = this.federatedLogin.bind(this);
    this.register = this.register.bind(this);
    this.checkAuthentication = this.checkAuthentication.bind(this);
  }

  login() {
    this.setState({progress: true});

    const {username, password} = this.state;
    const {navigation} = this.props;
    signIn({username, password})
      .then((token) => {
        this.setState(
          {
            progress: false,
            error: '',
          },
          () => navigation.navigate('Profile'),
        );
      })
      .catch((e) => {
        console.warn('onError', e);
        console.log(JSON.stringify(e));
        this.setState({progress: false, error: e.message});
      });
  }

  federatedLogin() {
    this.setState({progress: true});

    const {navigation} = this.props;
    signIn()
      .then((token) => {
        console.log('federatedLogin', token);
        if (token !== undefined) {
          this.setState(
            {
              progress: false,
              error: '',
            },
            () => navigation.navigate('Messages'),
          );
        }
      })
      .catch((e) => {
        this.setState({progress: false, error: e.message});
      });
  }

  register() {
    const {navigation} = this.props;

    navigation.navigate('Register');
  }

  async componentDidMount() {
    let that = this;
    const {navigation} = this.props;
    EventEmitter.addListener('signInSuccess', function (e) {
      that.setContext('Logged in!');
      that.setState(
        {
          authenticated: true,
          progress: false,
          error: '',
        },
        () => navigation.navigate('Messages'),
      );
    });
    EventEmitter.addListener('signOutSuccess', function (e) {
      that.setState({
        authenticated: false,
        progress: false,
        error: JSON.stringify(e),
      });
      that.setContext('Logged out!');
    });
    EventEmitter.addListener('onError', function (e) {
      console.warn('onError', e);
      that.setState({
        authenticated: false,
        progress: false,
        error: JSON.stringify(e),
      });
      that.setContext(e.error_message);
    });
    EventEmitter.addListener('onCancelled', function (e) {
      that.setState({
        authenticated: false,
        progress: false,
        error: JSON.stringify(e),
      });
      console.warn(e);
    });
    this.checkAuthentication();
  }

  componentWillUnmount() {
    EventEmitter.removeAllListeners('signInSuccess');
    EventEmitter.removeAllListeners('signOutSuccess');
    EventEmitter.removeAllListeners('onError');
    EventEmitter.removeAllListeners('onCancelled');
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const result = await isAuthenticated();
    if (result.authenticated !== this.state.authenticated) {
      this.setState({authenticated: result.authenticated});
    }
  }

  setContext = (message) => {
    this.setState({
      context: message,
    });
  };

  render() {
    const {progress, error} = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <Spinner
            visible={progress}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          <Image
            style={styles.tinyLogo}
            source={require('./assets/okta.png')}
          />

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <TextInput
                label="Username"
                style={styles.textInput}
                placeholder="User Name"
                onChangeText={(username) => this.setState({username})}
              />
              <TextInput
                label="Password"
                secureTextEntry={true}
                style={{marginTop: 5}}
                onChangeText={(password) => this.setState({password})}
              />
              <HelperText type="error" padding="none" visible={error}>
                {error}
              </HelperText>
              <View style={{marginTop: 40, height: 40}}>
                <Button
                  mode="contained"
                  testID="loginButton"
                  onPress={this.login}>
                  Login
                </Button>
              </View>
              <View style={{marginTop: 10, height: 40}}>
                <Button
                  mode="contained"
                  testID="federatedLoginButton"
                  onPress={this.federatedLogin}>
                  Sign in with Apple 
                </Button>
              </View>

              <View style={{marginTop: 40, height: 40}}>
                <Button
                  mode="outlined"
                  testID="registerButton"
                  onPress={this.register}>
                  Register
                </Button>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '90%',
  },
  button: {
    borderRadius: 40,
    height: 40,
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0066cc',
    paddingTop: 40,
    textAlign: 'center',
  },
});
