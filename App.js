import {
  SafeAreaView
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import { store } from './store';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

export default function App() {

  return (
    <Provider store={store}>
      <SafeAreaView style={tw`flex-1`}>
        <HomeScreen />
      </SafeAreaView>
    </Provider>
  );
}