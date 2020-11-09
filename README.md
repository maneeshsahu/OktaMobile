# Okta React Native with AWS Gateway Resource Server

This example shows you how to use the [Okta React Native SDK](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react-native) to adopt Okta Authentication flow in your app.

## Clone repo

To run this application, you first need to clone this repo and then enter into this directory:

```bash
git clone git@github.com:maneeshsahu/OktaMobile.git
cd OktaMobile
```

## Install dependencies

### Setup Development Environment for ReactNative

OktaMobile requires the React Native CLI. See documentation for environment setup: https://reactnative.dev/docs/environment-setup

You will need to setup Android Studio and an Android Virtual Device Emulator for Android Development. For iOS, you will need to install Xcode (MacOS only) and create an Apple iPhone Simulator.

### Install JS dependencies

Install dependencies based on package.json

```bash
npm ci
```

### Install CocoaPods dependencies (iOS)

CocoaPods dependencies are needed for ios development

```bash
cd ios && pod install && cd ..
```

### Generate Andorid Keystore for Development (Android)

```bash
keytool -genkey -v -keystore android/app/debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
```

## Run OktaMobile

### Start Metro

```bash
npx react-native start
```

### Run on Emulator

Launch an Android Emulator or iOS Simulator, then

```bash
# Android
npx react-native run-android

# iOS
npx react-native run-ios
```

## Using This Example

Enter your credentials and tap the **Login** button. You can login with the same account that you created when signing up for your Developer Org, or you can use a known username and password from your Okta Directory.

![Custom Login Screen](/images/okta-mobile-login-screen.png)

After you complete the login flow, you will see your account information.

![Account Profile Screen](/images/okta-mobile-profile-claims.png)

If you click on the `message` icon in the AppBar, you will be able to see the messages from the Resource Server (AWS API Gateway).

Note: You will need to edit the `samples.config.js` and update the `resourceServer.messagesUrl` to specify your API Gateway endpoint.

```js
...
  resourceServer: {
    messagesUrl:
      'https://ABBA.execute-api.us-east-1.amazonaws.com/api/messages',
  },
};

```

![Messages Screen](/images/okta-mobile-messages.png)
