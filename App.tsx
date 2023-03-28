import React from 'react';
import 'react-native-gesture-handler';
import {useColorScheme, StatusBar} from 'react-native';
import {darkMode, lightMode} from './styles/constants';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Homescreen} from './pages/home-page/homescreen';
import {Insightscreen} from './pages/insight-page/insightscreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { OnboardingScreen } from './pages/onboarding-screen/onboardingScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { AllTransactions } from './pages/all-transactions/transactions';
import { Button } from 'react-native';
import { TransactionProvider } from './providers/TransactionProvider';
import { UPIPayments } from './pages/upi-payments-page/upiPayments';


const Tab = createBottomTabNavigator();

function HomeTabs() {
  const theme = useTheme();

  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: theme.colors.mainGreen,
      tabBarAllowFontScaling: true,
      tabBarInactiveTintColor: "grey",
      tabBarShowLabel: false,
    }}>
      <Tab.Screen name="Homescreen" component={Homescreen} options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon name='home' size={24} color={focused?theme.colors.mainGreen:"grey"} />
          )         
        }} />
      <Tab.Screen name="Insights" component={Insightscreen} options={{        
        headerTitle:"Your Insights",
        headerTintColor: Colors.white,
        tabBarIcon: ({ focused }) => (
          <IonIcon name='analytics' size={24} color={focused?theme.colors.mainGreen:"grey"} />
        )
      }} />
    </Tab.Navigator>
  );
}


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
      <TransactionProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer theme={backgroundStyle.backgroundColor}>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={HomeTabs}
              options={{headerShown: false}}
            />      
            <Stack.Screen
              name="UPIPayments"
              component={UPIPayments}
              options={{headerShown: false}}
            />       
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen
              name="AllTransactions"
              component={AllTransactions}
              options={{
                headerTitle:"All Transactions",
                headerTintColor: Colors.white
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
      </TransactionProvider>
    </SafeAreaProvider>
  );
}

export default App;
