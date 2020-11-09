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
  Alert,
  Dimensions,
  Image,
  ScrollView,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {
  Appbar,
  Avatar,
  Paragraph,
  Card,
  Button,
  IconButton,
  useTheme,
} from 'react-native-paper';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {getAccessToken, getUser, clearTokens} from '@okta/okta-react-native';
import configFile from '../samples.config';
import {Header} from 'react-native/Libraries/NewAppScreen';

export default class MessagesScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      error: '',
      messages: [],
    };

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    getAccessToken().then((accessToken) => {
      console.log('Got access token', accessToken.access_token);
      fetch(configFile.resourceServer.messagesUrl, {
        method: 'get',
        headers: new Headers({
          Authorization: 'Bearer ' + accessToken.access_token,
        }),
      })
        .then((response) => {
          console.log(JSON.stringify(response));
          return response.json();
        })
        .then((json) => {
          this.setState({messages: json.messages});
        })
        .catch((error) => {
          console.error(error);
          this.setState({error});
        })
        .finally(() => {
          this.setState({isLoading: false});
        });
    });
  }

  getAsset(id) {
    return;
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
    const {isLoading, error, messages} = this.state;
    return (
      <>
        <Appbar.Header>
          <Appbar.Content
            title="Messages"
            subtitle={configFile.resourceServer.messagesUrl}
          />
          <Appbar.Action
            icon="account"
            onPress={() => {
              this.props.navigation.navigate('Profile');
            }}
          />
          <Appbar.Action icon="logout" onPress={() => this.logout()} />
        </Appbar.Header>
        <StatusBar barStyle="dark-content" />
        <ScrollView
          style={[styles.container]}
          contentContainerStyle={styles.content}>
          {messages.map((message, key) => (
            <Card style={styles.card}>
              <Card.Title title={message.text} subtitle={message.date} />
            </Card>
          ))}
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 4,
  },
  item: {
    height: Dimensions.get('window').width / 2,
    width: '100%',
    padding: 4,
  },
  photo: {
    flex: 1,
    justifyContent: 'space-around',

    resizeMode: 'contain',
  },
  card: {
    margin: 4,
  },
});
