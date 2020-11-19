import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import * as Font from 'expo-font';
import Home from './screens/home';
import { AppLoading } from 'expo';
//import Navigator from './routes/homeStack';
import { AppNavigator } from './routes/AppNavigator';

const getFonts = () => Font.loadAsync({
  'nunito-regular': require('./assets/fonts/NunitoSans-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/NunitoSans-Bold.ttf'),
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  if (fontsLoaded) {
    return <AppNavigator />;
  }
  else {
    // if fonts are not loaded yet then we return the AppLoading component from expo that calls getFonts
    // and when getFonts is done it sets the bool to true
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    );
    
  }
}
