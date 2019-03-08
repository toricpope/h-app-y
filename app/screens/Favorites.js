import React from 'react';
import { Text, StyleSheet, View, Button, ScrollView} from 'react-native';
import { Location, Permissions } from 'expo';
import Map from '../components/Map';
import YelpService from '../services/yelp';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Favorites extends React.Component {
  static navigationOptions = {
    header: null,
    footer: null
  }

  render() {
    return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Button title='map' color='#fce205' onPress={() => this.props.navigation.navigate('Home')}/>
        <Text style={styles.title}>
          h
          <Text style={{color:'#fda50f'}}>app</Text>
          y
        </Text>
      </View>
      <ScrollView style={styles.page}>
        <Text style={{fontSize:150}}>Scroll me plz</Text>
      </ScrollView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffc30b',
    paddingRight: 137,
    paddingLeft: 10,
    height: 75
  },
  title: {
    fontFamily: 'Verdana',
    fontSize: 30,
    color: '#ffddaf'
  },
  page: {
    flex: 5
  }
});

