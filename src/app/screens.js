// https://github.com/react-community/react-navigation/issues/458
// once that issue is resolved, the initial loading screen is no longer needed and should be removed
//  in favour of setting the initialRoute as a prop of the navigator
import React from 'react';
import { StackNavigator } from 'react-navigation';

import * as Routes from '../constants/routes';

import CustomHeader from './components/CustomHeader';
import Home from './screens/Home';

const routes = StackNavigator({
  [Routes.Home]: {
    screen: Home,
    navigationOptions: () => ({
      title: 'Home',
      header: <CustomHeader />
    })
  }
});

export default routes;
