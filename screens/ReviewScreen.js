import React, { Component } from 'react';
import { View, Text, Platform, Button } from 'react-native';

class ReviewScreen extends Component {
    static navigationOptions = {
        title: "Review Jobs",
        header: ({ navigate }) => {
            return {
                right:( 
                        <Button 
                            title="Settings" 
                            onPress= {() => { navigate('settings') }}
                            backgroundColor = "rgba(0, 0, 0, 0)"
                            color = "rgba(0, 122, 255, 0)"
                        />
                    ),
                    style = {
                        marginTop: Platform.OS === 'android' ? 24: 0
                    }
            };
        }
    };

    render() {
        return (
            <View>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
            </View>
        );
    }
}

export default ReviewScreen;