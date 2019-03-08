import { createStackNavigator, createAppContainer } from 'react-navigation';
import Homescreen from './app/screens/Homescreen';
import Favorites from './app/screens/Favorites';

const AppStackNavigator = createStackNavigator({
  Home: {
    screen: Homescreen
  },
  Favorites: {
    screen: Favorites
  }
});

const App = createAppContainer(AppStackNavigator);

export default App;
