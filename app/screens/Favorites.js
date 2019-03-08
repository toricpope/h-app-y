import React from 'react';
import { Text, StyleSheet, View, Button} from 'react-native';
import { Location, Permissions } from 'expo';
import Map from '../components/Map';
import YelpService from '../services/yelp';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Favorites extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Button title='home' color='#effd5f' onPress={() => this.props.navigation.navigate('Home')}/>
        <Text style={styles.title}>h app y</Text>
      </View>
      <View style={styles.page}>

      </View>
      <View style={styles.footer}>
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
    paddingRight: 125,
    paddingLeft: 10
  },
  title: {
    fontFamily: 'Verdana',
    fontSize: 30,
    color: '#ffddaf'
  },
  page: {
    flex: 5
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
    backgroundColor: '#ffc30b'
  }
});

