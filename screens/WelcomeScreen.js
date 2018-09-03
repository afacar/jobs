import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Slides from '../components/Slides';

const SLIDE_DATA = [
    {text: "Welcome to Job App", color: '#03A9F4'},
    {text: "Use this to get a job", color: '#006698'},
    {text: "Set your location, then swipe away", color: '#03A9F4'}
];

class WelcomeScreen extends Component {
    // instead of this, we can use air function
    // onSlidesComplete = () => {}
    // In this case, we don't need to use .bind(this) in order to
    // Bind context to function 
    onSlidesComplete() {
        this.props.navigation.navigate('auth');
    }

    render() {
        return (
            <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete.bind(this)} />
        );
    }
}

export default WelcomeScreen;