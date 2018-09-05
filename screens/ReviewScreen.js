import React, { Component } from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import {connect} from 'react-redux';
import { Card, Button, Icon } from 'react-native-elements';
import { MapView } from 'expo';

class ReviewScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Review Jobs',
        tabBarIcon: ({ tintColor }) => {
                return <Icon name="favorite" size={30} color={tintColor} />;
        },
        headerRight: (
                        <Button 
                            title='Settings' 
                            onPress={() => navigation.navigate('settings')}
                            backgroundColor = "rgba(0, 0, 0, 0)"
                            color = "rgba(0, 122, 255, 1)"
                        />
                    )
    });

    renderLikedJobs() {
        return this.props.likedJobs.map(job => {
            const {id, company, created_at, url, title, location} = job;
            const initialRegion = {
                longitude: -122,
                latitude: 37,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
            };

            return (
                <Card key={id} title={title} >
                    <View style={{ height: 200 }}>
                        <MapView 
                            style={{ flex: 1 }}
                            cachEnabled={true}
                            scrollEnabled={false}
                            initialRegion={initialRegion}
                        />
                        <View style={styles.detailWrapperStyle}>
                            <Text style={styles.italics} >{company}</Text>
                            <Text style={styles.italics} >{created_at}</Text>
                        </View>
                        <Button 
                            style={{ flex: 1 }}
                            title="Apply Now"
                            backgroundColor="#03A9F4"
                            onPress={() => Linking.openURL(url)}
                        />
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
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
};

function mapStateToProps(state) {
    return { likedJobs: state.likedJobs};
}

export default connect(mapStateToProps)(ReviewScreen);