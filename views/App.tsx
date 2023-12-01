/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './login/login';
import SignUp from './login/signup/signup';
import QrView from './qr-view/qrView';
import MainScreen from './mainScreen';
import InfoSetting from './info-setting/infoSetting';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from '../redux/reducers';
const store = createStore(reducer);

function App(): JSX.Element {

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store} >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false,}}>
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="QrView" component={QrView} />
          <Stack.Screen name="InfoSetting" component={InfoSetting} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    
  );
}

export default App;
export type RootState = ReturnType<typeof store.getState>;
