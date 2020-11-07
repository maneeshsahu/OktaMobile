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

export default class MessagesScreen extends React.Component {
  constructor(props) {
    super(props);
    let messages = [
      {
        id: '24hrs',
        name: '24 Hrs',
        title: 'Save Our Town',
      },
      {
        id: '911',
        name: '911',
      },
      {
        id: 'celebrity-watch-party',
        name: 'Celebrity Watch Party',
        title: 'The Party Has Begun',
      },
      {
        id: 'family-guy',
        name: 'Family Guy',
        title: 'Go Big or Go Home',
      },
      {
        id: 'prodigal-son',
        name: 'Prodigal Son',
        title: 'Like Father...',
      },
      {
        id: 'simpsons',
        name: 'Simpsons',
        title: 'The Hateful Eight-Year Olds',
      },
      {
        id: 'the-masked-singer',
        name: 'The Masked Singer',
        title: 'A Quarter Mask Crisis',
      },
    ];

    this.state = {
      progress: false,
      error: '',
      tvShows: tvShows,
    };

    this.logout = this.logout.bind(this);
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
    const {progress, error, messages} = this.state;
    return (
      <>
        <Appbar.Header>
          <Appbar.Action icon="logout" onPress={() => this.logout()} />
          <Appbar.Content title="Messages" subtitle="Resource Server" />
        </Appbar.Header>
        <StatusBar barStyle="dark-content" />
        <ScrollView
          style={[styles.container]}
          contentContainerStyle={styles.content}>
          {messages.map((message, key) => (
            <Card style={styles.card}>
              {/* <Card.Cover source={tvShow.image} resizeMode="stretch" /> */}
              <Card.Title title={message.name} />
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
