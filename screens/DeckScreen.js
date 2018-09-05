import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import Swipe from '../components/Swipe';
import { MapView } from 'expo';
import * as actions from '../actions';

class DeckScreen extends Component {
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
                    {job.description}
                </Text>
            </Card>
        );
    }

    renderNoMoreCards() {
        return (
            <Card title="No more jobs!">
            </Card>
        );
    }

    render() {
        return (
            <View style={{ marginTop:10 }}>
                <Swipe 
                    data={this.props.jobs}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                    onSwipeRight={job => this.props.likeJob(job)}
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