import React from 'react';
import { StyleSheet, Button, View, Dimensions, Alert } from 'react-native';
import { Notifications } from 'expo';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';

import configureStore from './store';
import registerForNotifications from './services/push_notifications';
import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

const SCREEN_WIDTH = Dimensions.get('window').width;


export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;
      if ( origin==='received' && text){
        Alert.alert(
          'New push ',
          text,
          [{ text: 'Ok.'}]
        );
      }
    });
  }

  render() {
    const { persistor, store } = configureStore();
    const ReviewNavigator = createStackNavigator({
      review: { screen: ReviewScreen },
      settings: { screen: SettingsScreen }
    });

    const MainNavigator = createBottomTabNavigator({
      map: { screen: MapScreen },
      deck: { screen: DeckScreen },
      reviews: { screen: ReviewNavigator }
      },
      {
        tabBarOptions: {
          labelStyle: { fontSize: 16 }
        },
        tabBarPosition: 'bottom',
        swipeEnabled: true
      });

    const AppNavigator = createBottomTabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: { screen: MainNavigator }
    },
    {
      // Biggest GOTCHA in the world!
      // React Navigator renders every compoenent given in advance EAGERLY
      // We should give following lazy: true prop to make it render lazy
      lazy: true,
      navigationOptions: { 
        tabBarVisible: false
      }
    });

    return (
      <Provider store={store} >
      <PersistGate persistor={persistor} >
          <View style={styles.container} >
            <AppNavigator />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
