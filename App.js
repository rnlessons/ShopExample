import 'react-native-gesture-handler';
import * as React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import screens from './src/screens';
import TabNavigator from './src/components/MainTab';

const {
  ProductListScreen,
  OrderListScreen,
  MyPageScreen,
  ...restScreens
} = screens;

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <SafeAreaProvider>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainTab"
          //  headerMode="none"
        >
          <Stack.Screen
            name="MainTab"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          {Object.entries(restScreens).map(([name, component]) => (
            <Stack.Screen name={name} key={name} component={component} />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
