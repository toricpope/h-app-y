import React from 'react';
import { Text, StyleSheet, View, Button, ScrollView, AsyncStorage, Alert} from 'react-native';
import IconAD from 'react-native-vector-icons/AntDesign';


export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faves: null
    };
  }

  async getFaves() {
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
  }

  componentDidMount() {
    try {
      this.getFaves();
    } catch(err) {
      console.error(err);
    }
  }

  async removeFromFaves(key) {
    try {
      await AsyncStorage.removeItem(key);
      this.getFaves();
    } catch (err) {
      console.log(err);
    }
  }

  handlePress(key) {
    Alert.alert(
      'Remove from favorites?',
      '',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => this.removeFromFaves(key)
        }
      ]
    );
  }

  static navigationOptions = {
    header: null,
  }

  render() {
    const { faves } = this.state;
    return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.title}>
          h
          <Text style={{color:'#fce205'}}>app</Text>
          y
        </Text>
        <Button title='map' color='#ffddaf' onPress={() => this.props.navigation.navigate('Home')}/>
      </View>
      <ScrollView style={styles.page}>
        {
          faves ?
          faves.map(fave => {
            return (
              <View key={fave.name} style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <IconAD name="smile-circle" size={30} color="#fda50f" style={styles.icon}/>
                </View>
                <View>
                  <Text style={styles.faveTitle}>{fave.name}</Text>
                  <Text style={styles.faveLocation}>
                    {fave.location.display_address[0]}. { fave.location.display_address[1]}
                  </Text>
                </View>
                <View style={{marginLeft: 'auto'}}>
                  <IconAD name="close" size={30} color="#fda50f" style={styles.icon} onPress={() => this.handlePress(fave.name)}/>
                </View>
              </View>
            );
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
    height: 80,
    paddingRight: 20,
    paddingLeft: 20
  },
  title: {
    fontFamily: 'Verdana',
    fontSize: 30,
    color: '#fda50f'
  },
  page: {
    flex: 5,
    backgroundColor: '#ffddaf'
  },
  faveTitle: {
    fontFamily: 'Verdana',
    fontSize: 15,
    padding: 10
  },
  faveLocation: {
    fontFamily: 'Verdana',
    fontSize: 10,
    padding: 10
  },
  icon: {
    padding: 10
  }
});

