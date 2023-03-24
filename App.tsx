import React from 'react';
import 'react-native-gesture-handler';
import {useColorScheme, StatusBar} from 'react-native';
import {darkMode, lightMode} from './styles/constants';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Homescreen} from './pages/home-page/homescreen';
import {Insightscreen} from './pages/insight-page/insightscreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { OnboardingScreen } from './pages/onboarding-screen/onboardingScreen';

const Stack = createStackNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? darkMode : lightMode,
  };
  const barBackgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider
      style={{
        backgroundColor: backgroundStyle.backgroundColor.backgroundColor,
      }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer theme={backgroundStyle.backgroundColor}>
        <Stack.Navigator>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={Homescreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Inisght"
            component={Insightscreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
