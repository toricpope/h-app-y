import React from 'react';
import { Text, StyleSheet, View, Button, ScrollView, AsyncStorage, FlatList} from 'react-native';
import { Location, Permissions } from 'expo';
import Map from '../components/Map';
import YelpService from '../services/yelp';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faves: null
    };
  }

  async componentDidMount() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      let valueArr = [];
      items.forEach(item => {
        const parsedItem = JSON.parse(item[1]);
        valueArr.push(parsedItem);
      });
      this.setState({
        faves: valueArr
      });
    } catch(err) {
      console.error(err);
    }
  }

  static navigationOptions = {
    header: null,
    footer: null
  }

  render() {
    const { faves } = this.state;
    console.log('FAVES', faves)
    return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Button title='map' color='#ffddaf' onPress={() => this.props.navigation.navigate('Home')}/>
        <Text style={styles.title}>
          h
          <Text style={{color:'#fce205'}}>app</Text>
          y
        </Text>
      </View>
      <ScrollView style={styles.page}>
        {
          faves ?
          faves.map(fave => {
            return (<Text key={fave.name}>{fave.name}</Text>);
          })
          : null
        }
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
    color: '#fda50f'
  },
  page: {
    flex: 5
  }
});

