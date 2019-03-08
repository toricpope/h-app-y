import React from 'react';
import { Text, StyleSheet, View, Button} from 'react-native';
import { Location, Permissions } from 'expo';
import Map from '../components/Map';
import YelpService from '../services/yelp';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// A placeholder until we get our own location
const region = {
  latitude: 37.321996988,
  longitude: -122.0325472123455,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

export default class Homescreen extends React.Component {
  state = {
    region: null,
    places: [],
    errorMessage: '',
    isOpen: false
  }

  componentWillMount() {
    this.getLocationAsync();
  }

  async getPlaces (filter) {
    const { latitude, longitude } = this.state.region;
    const userLocation = { latitude, longitude };
    const places = await YelpService.getPlaces(userLocation, filter);
    this.setState({ places });
  }

  async getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    };
    await this.setState({ region });
    await this.getPlaces();
  }

  async handleFilter(filter) {
    await this.getPlaces(filter);
  }

  static navigationOptions = {
    header: null
  }

  render() {
    const { region, places } = this.state;
    return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.title}>h app y</Text>
        <Button title='faves' color='#effd5f' onPress={() => this.props.navigation.navigate('Favorites')}/>
      </View>
        <Map
          region={region}
          places={places}
        />
      <View style={styles.footer}>
        <ActionButton buttonColor='#FCE205'>
          <ActionButton.Item buttonColor='#fada5e' title="Spas" onPress={() => this.handleFilter({ term: 'spa' })}>
            <Icon name="flower" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#f8e473' title="Yoga" onPress={() => this.handleFilter({ term: 'yoga,pilates'})}>
            <Icon name="human-handsup" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#f8de7e' title="Parks" onPress={() => this.handleFilter({ term: 'park' })}>
            <Icon name="tree" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffc30b',
    paddingRight: 10,
    paddingLeft: 125
  },
  title: {
    fontFamily: 'Verdana',
    fontSize: 30,
    color: '#ffddaf'
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
    backgroundColor: '#ffc30b'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  }
});
