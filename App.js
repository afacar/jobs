import React from 'react';
import { StyleSheet, Button, View, Dimensions } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

const SCREEN_WIDTH = Dimensions.get('window').width;


export default class App extends React.Component {
  render() {
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
        <View style={styles.container} >
          <AppNavigator />
        </View>
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
