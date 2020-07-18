import React from 'react';
import 'mobx-react-lite/batchingForReactDom';
import { UserInfo } from './core/store/userInfo';
import Navigator from './core/navigator/Navigator';
import {enableScreens} from 'react-native-screens'
import { Items } from './core/store/Items';

enableScreens(); // Improves performance

const App = () => {
  UserInfo.initUserInfo();
  Items.initFoodItems();

  return <Navigator/>
}

export default App;