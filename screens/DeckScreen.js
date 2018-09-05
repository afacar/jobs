import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Swipe from '../components/Swipe';
import { MapView } from 'expo';
import * as actions from '../actions';

class DeckScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Jobs',
        tabBarIcon: ({ tintColor }) => {
                return <Icon name="description" size={30} color={tintColor} />;
        }
    });

    renderCard(job) {
        console.log('JOB', job);
        const initialRegion = {
            longitude: -122,
            latitude: 37,
            latitudeDelta: 0.045,
            longitudeDelta: 0.02
        };

        return (
            <Card title={job.title} >
                <View style={{ height:300 }}>
                    <MapView
                        scrollEnabled={false}
                        style={{ flex:1 }}
                        cashEnabled={true}
                        initialRegion={initialRegion}
                    >
                </MapView>
                </View>
                <View style={styles.detailWrapperStyle} >
                    <Text>{job.company}</Text>
                    <Text>{job.created_at}</Text>
                </View>
                <Text>
                    {job.description.substring(0, 40)}
                </Text>
            </Card>
        );
    }

    // Big GOTCHA: since this renderNoMoreCard is called from Swipe component
    // this.props.navigation.navigate('map') is undefined
    // Because Swipe is not defined as scene in React.Navigation at App.js
    // Thus, we bind context to method while sending it to Swipe
    // As this.renderNoMoreCards.bind(this)
    renderNoMoreCards() {
        return (
            <Card title="No more jobs!">
                <Button 
                    title="Back to Map"
                    large
                    icon={{ name: 'my-location' }}
                    backgroundColor="#03A9F4"
                    onPress={() => this.props.navigation.navigate('map')}
                />
            </Card>
        );
    }

    render() {
        return (
            <View style={{ marginTop:10 }}>
                <Swipe 
                    data={this.props.jobs}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards.bind(this)}
                    onSwipeRight={job => this.props.likeJobs(job)}
                    keyProp="id"
                />
            </View>
        );
    }
}

const styles = {
    detailWrapperStyle:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    }
};

function mapStateToProps({ jobs }) {
    return { jobs: jobs.results};
}

export default connect(mapStateToProps, actions)(DeckScreen);