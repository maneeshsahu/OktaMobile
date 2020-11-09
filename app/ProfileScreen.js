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
import {SafeAreaView, StyleSheet, Text, StatusBar, View} from 'react-native';
import {getAccessToken, getUser, clearTokens} from '@okta/okta-react-native';
import {List} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import Error from './components/Error';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: null,
      user: null,
      progress: true,
      error: '',
    };

    this.logout = this.logout.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => (
        <Text onPress={this.logout} style={styles.logoutButton}>
          Logout
        </Text>
      ),
    });

    this.setState({progress: true});
    getUser()
      .then((user) => {
        this.setState({progress: false, user});
      })
      .catch((e) => {
        this.setState({progress: false, error: e.message});
      });
  }

  getAccessToken() {
    this.setState({progress: false});
    getAccessToken()
      .then((token) => {
        this.setState({
          progress: false,
          accessToken: token.access_token,
        });
      })
      .catch((e) => {
        this.setState({progress: false, error: e.message});
      });
  }

  logout() {
    clearTokens()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch((e) => {
        this.setState({error: e.message});
      });
  }

  render() {
    const {user, accessToken, error, progress} = this.state;

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <Spinner
            visible={progress}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          <Error error={error} />
          {user &&
            Object.keys(user).map((property) => (
              <List.Item
                title={property}
                description={user[property]}
                left={(props) => (
                  <List.Icon {...props} icon="account-key-outline" />
                )}
              />
            ))}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  button: {
    borderRadius: 40,
    width: 200,
    height: 40,
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  logoutButton: {
    paddingLeft: 10,
    fontSize: 16,
    color: '#0066cc',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  titleHello: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066cc',
    paddingTop: 40,
  },
  titleDetails: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 15,
    textAlign: 'center',
  },
  tokenContainer: {
    marginTop: 20,
  },
  tokenTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
