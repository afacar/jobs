import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Button } from 'react-native';

const SCREEN_WIDTH = Dimensions.get("window").width;

class Slides extends Component {
    renderLastSlide(index) {
        if(index === this.props.data.length-1 ) {
            return (
                <Button 
                    title="Take me to App"
                    onPress={ this.props.onComplete }
                />
            );
        }
    }

    renderSlides() {
        return this.props.data.map((slide, index) => {
            return (
                <View 
                    style={[styles.slideStyle, {backgroundColor: slide.color}]} 
                    key={index} 
                >
                    <Text style={styles.textStyle} >{ slide.text }</Text>
                    {this.renderLastSlide(index)}
                </View>
                );
        });
    }

    render() {
        return (
            <ScrollView
                pagingEnabled
                horizontal
                style={{flex:1}}
            >
                { this.renderSlides() }
            </ScrollView>
        );
    }
} 

const styles = {
    slideStyle: {
        width: SCREEN_WIDTH,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 30,
        color: 'white'
    }
};

export default Slides;