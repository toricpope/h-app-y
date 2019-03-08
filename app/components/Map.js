import React, { Component } from 'react';
import { MapView } from 'expo';
import Icon from 'react-native-vector-icons/AntDesign';
import { Alert } from 'react-native';

const Marker = MapView.Marker;

export default class Map extends Component {
  handlePress() {
    Alert.alert(
      'Add to favorites?',
      '',
      [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => console.log('Yes Pressed')},
      ],
      {cancelable: false},
    );
  }

  renderMarkers() {
    return this.props.places.map((place, i) => (
      <Marker key={i} title={place.name} coordinate={place.coords} description={`Rating: ${place.rating.toString()}`}  onCalloutPress={() => this.handlePress()}>
        <Icon name="smile-circle" size={25} color="#fda50f"/>
      </Marker>
    ));
  }

  render() {
    const { region } = this.props;
    return (
      <MapView
        style={styles.container}
        region={region}
        showsUserLocation
        showsMyLocationButton
      >
        {this.renderMarkers()}
      </MapView>
    );
  }
}
const styles = {
  container: {
    width: '100%',
    height: '80%',
  }
};
