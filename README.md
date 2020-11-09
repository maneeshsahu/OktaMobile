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

## Run sample

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

After you complete the login flow, you will be able to see the messages from the Resource Server (AWS API Gateway).

![Messages Screen](/images/okta-mobile-messages.png)
