import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import {useColorScheme, StatusBar, PermissionsAndroid} from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_LAUNCHED } from './constants/cacheConstants';
import { SmsPermissionScreen } from './pages/sms-Permission-page/smsPermissionScreen';


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
  const [firstlaunch, setFirstlaunch] = useState<boolean|null>(null);
  const [smsPermission, setSmsPermission] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? darkMode : lightMode,
  };

  const askForSMSPermission = async () => {
    const reqPer = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS);
    if(reqPer === PermissionsAndroid.RESULTS.GRANTED){
      setSmsPermission(true);      
    }else {
      setSmsPermission(false);      
    }
  }

  const checkSMSPermission = async () => {
    const smsPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_SMS)
    if(smsPermission === PermissionsAndroid.RESULTS.GRANTED)
    {
      setSmsPermission(true);
    }else{
      askForSMSPermission();
    }
  }


  useEffect(() => {
    const checkForFirstLaunch = async () => {
      const isFirstLaunchCache = await AsyncStorage.getItem(APP_LAUNCHED);
      if(isFirstLaunchCache == null)
      {
        setFirstlaunch(true);
      }else{
        setFirstlaunch(false);
      }
    }
    checkForFirstLaunch();
    checkSMSPermission();
  }, [])

  return (
    <SafeAreaProvider
      style={{
        backgroundColor: backgroundStyle.backgroundColor.backgroundColor,
      }}>
      <TransactionProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      {
      firstlaunch!=null && (
      <NavigationContainer theme={backgroundStyle.backgroundColor}>
        <Stack.Navigator>
          {firstlaunch && <Stack.Group>
              <Stack.Screen
                  name="Onboarding"
                  component={OnboardingScreen}
                  options={{headerShown: false}}
                />
            </Stack.Group>}
          {
            !smsPermission?<Stack.Group>
              <Stack.Screen
                  name="SmsPermission"
                  component={SmsPermissionScreen}
                  options={{headerShown: false}}
                />  
            </Stack.Group>:
            <Stack.Group>
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
          }
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
      )
      }
      </TransactionProvider>
    </SafeAreaProvider>
  );
}

export default App;
