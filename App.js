import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

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
        tabBarPosition: 'bottom'
      });

    const AppNavigator = createBottomTabNavigator({
      welcome: {screen: WelcomeScreen},
      auth: {screen: AuthScreen},
      main: {
        screen: MainNavigator
      }
    },
    {
      tabBarOptions: {
          style: {
              width: SCREEN_WIDTH
          }
      },
      tabBarPosition: 'bottom'
    });

    return (
      <View style={styles.container} >
        <AppNavigator />
      </View>
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
