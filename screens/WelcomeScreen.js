import _ from 'lodash';
import React, { Component } from 'react';
import Slides from '../components/Slides';
import { AsyncStorage } from 'react-native';
import {AppLoading} from 'expo';

const SLIDE_DATA = [
    {text: "Welcome to Job App", color: '#03A9F4'},
    {text: "Use this to get a job", color: '#006698'},
    {text: "Set your location, then swipe away", color: '#03A9F4'}
];

class WelcomeScreen extends Component {
    state = { token : null };

    async componentWillMount () {
        let token = await AsyncStorage.getItem('fb_token');

        if (token) {
            this.props.navigation.navigate('map');
            this.setState({ token });
        } else {
            this.setState({ token: false });
        }
    }

    // instead of this, we can use air function
    // onSlidesComplete = () => {}
    // In this case, we don't need to use .bind(this) 
    // In order to Bind context to function 
    onSlidesComplete() {
        this.props.navigation.navigate('auth');
    }

    render() {
        if (_.isNull(this.state.token)) {
            return <AppLoading />;
        }
        return (
            <Slides 
                data={ SLIDE_DATA } 
                onComplete={ this.onSlidesComplete.bind(this) } 
            />);
    }
}

export default WelcomeScreen;