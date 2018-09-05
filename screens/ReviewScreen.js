import React, { Component } from 'react';
import { View, Text, Platform, Button, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import { Card } from 'react-native-elements';

class ReviewScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Review Jobs',
        headerRight: (
                        <Button 
                            title='Settings' 
                            onPress={() => navigation.navigate('settings')}
                            backgroundColor = "rgba(0, 0, 0, 0)"
                            color = "rgba(0, 122, 255, 1)"
                        />
                    ),
    });

    renderLikedJobs() {
        return this.props.likedJobs.map(job => {
            return (
                <Card>
                    <View style={{ height: 200 }}>
                        <View style={styles.detailWrapperStyle}>
                            <Text style={styles.italics} >{job.company}</Text>
                            <Text style={styles.italics} >{job.created_at}</Text>
                        </View>
                    </View>
                </Card>
            );
        });
    }

    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        );
    }
}

const styles = {
    italics: {
        fontStyle: 'italic'
    },
    detailWrapperStyle: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
};

function mapStateToProps(state) {
    return { likedJobs: state.likedJobs};
}

export default connect(mapStateToProps)(ReviewScreen);